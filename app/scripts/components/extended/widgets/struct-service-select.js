/** @format */
import { selectController, selectTemplate } from "./common"

/**
 * Select-element. Gets values from "struct_values"-command.
 * Use the following settings in the corpus:
 * - escape: boolean, will be used by the escaper-directive
 */
export const structServiceSelect = {
    template: selectTemplate,
    controller: selectController(false),
}
