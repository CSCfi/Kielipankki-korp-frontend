/**
 * @file This is a login module that fetches a JWT from a source to see if the user is already logged in.
 *   If the JWT call fails, it will redirect the user to a login service, a service that will redirect
 *   the user back to Korp. After that the JWT call is expected to return a JWT.
 */
import { loginStatusComponent } from "@/components/auth/fed_login_status"
import settings from "@/settings"
import { AuthModule } from "./auth.types"

type Options = {
    jwt_url: string
    login_service: string
    logout_service: string
}

type State = {
    credentials: string[]
    jwt: string
    username: string
    protectedCorpora: string[]
}

type JwtPayload = {
    name?: string
    email: string
    ACA?: boolean
    "ACA-Fi"?: boolean
    scope: {
        corpora?: Record<string, number>
    }
    levels: Record<"READ" | "WRITE" | "ADMIN", number>
}

let state: State | undefined = undefined

if (typeof settings.auth_module != "object")
    throw new Error("federated_auth requires options (jwt_url, login_service, logout_service)")
const options = settings.auth_module.options as Options

const authModule: AuthModule = {
    init: async () => {
        // Fetch protected corpora list (needed even for non-logged-in users to show lock icons)
        const infoResponse = await fetch(`${settings.korp_backend_url}/info`)
        const info = await infoResponse.json()
        const protectedCorpora: string[] = info.protected_corpora || []

        const response = await fetch(options.jwt_url, {
            headers: { accept: "text/plain" },
            credentials: "include",
        })

        if (!response.ok) {
            if (response.status == 401) {
                console.log("User not logged in")
            } else {
                console.warn(`An error has occured: ${response.status}`)
            }
            // Store protected corpora list even for non-logged-in users
            state = { jwt: "", username: "", credentials: [], protectedCorpora }
            return false
        }

        const jwt = await response.text()

        const jwtPayload: JwtPayload = JSON.parse(atob(jwt.split(".")[1]))
        const { name, email, scope, levels, ACA, "ACA-Fi": acaFi } = jwtPayload
        const username = name || email

        // Fetch corpus info for protected corpora to get their License fields
        let corpusLicenses: Record<string, string> = {}
        if (protectedCorpora.length > 0) {
            const corpusInfoResponse = await fetch(
                `${settings.korp_backend_url}/corpus_info?corpus=${protectedCorpora.join(",")}`
            )
            const corpusInfo = await corpusInfoResponse.json()

            // Build map of corpus -> license type
            for (const [corpusId, data] of Object.entries(corpusInfo.corpora || {}) as [string, any][]) {
                const license = data.info?.License || ""
                corpusLicenses[corpusId.toUpperCase()] = license
            }
        }

        // Build credentials based on license requirements
        const credentials: string[] = []

        for (const corpusId of protectedCorpora) {
            const corpusUpper = corpusId.toUpperCase()
            const license = corpusLicenses[corpusUpper] || ""

            let hasAccess = false

            if (license === "ACA") {
                // ACA license requires ACA flag in JWT
                hasAccess = ACA === true
            } else if (license === "ACA-Fi") {
                // ACA-Fi license requires ACA-Fi flag in JWT
                hasAccess = acaFi === true
            } else {
                // RES license or no license field requires explicit grant in scope.corpora
                hasAccess = (scope.corpora?.[corpusId] || 0) >= levels["READ"]
            }

            if (hasAccess) {
                credentials.push(corpusUpper)
            }
        }

        state = { jwt, username, credentials, protectedCorpora }

        return true
    },
    initAngular: (korpApp) => {
        korpApp.component("loginStatus", loginStatusComponent)
    },
    login: () => {
        // TODO try to implement this again
        // if we already tried to login, don't redirect again, to avoid infinite loops
        // if (document.referrer == "") {
        // }
        window.location.href = `${options.login_service}?redirect=${window.location.href}`
    },
    logout: () => (window.location.href = options.logout_service),
    getAuthorizationHeader: (): Record<string, string> => (state ? { Authorization: `Bearer ${state.jwt}` } : {}),
    hasCredential: (corpusId) => (state?.credentials || []).includes(corpusId),
    getCredentials: () => state?.credentials || [],
    getProtectedCorpora: () => state?.protectedCorpora || [],
    getUsername: () => state!.username,
    isLoggedIn: () => !!state,
}

export default authModule
