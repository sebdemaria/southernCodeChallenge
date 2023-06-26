import * as Yup from "yup";

import { FORM_ERROR_MESSAGES } from "consts/FormErrorMessages";
import { ROVERS_SPECS } from "consts/rovers";
import { CURIOSITY } from "consts/rovers";

export const FiltersValidationSchema = (
    maxSolAvailable,
    filterBy,
    roverSelected = CURIOSITY
) =>
    filterBy === "earth_date"
        ? Yup.object({
              // error submit validations
              earth_date: Yup.date(FORM_ERROR_MESSAGES.date).required(
                  FORM_ERROR_MESSAGES.required
              ),
              sol: Yup.number(FORM_ERROR_MESSAGES.number).nullable(),
              camera: Yup.string(FORM_ERROR_MESSAGES.string).oneOf(
                  [ROVERS_SPECS[roverSelected]?.cameras],
                  FORM_ERROR_MESSAGES.invalidStatus
              ),
          })
        : Yup.object({
              // error submit validations
              earth_date: Yup.date(FORM_ERROR_MESSAGES.date).nullable(),
              sol: Yup.number(FORM_ERROR_MESSAGES.number)
                  .max(maxSolAvailable, "Sol not available for this rover")
                  .required(FORM_ERROR_MESSAGES.required),
              camera: Yup.string(FORM_ERROR_MESSAGES.string).oneOf(
                  [ROVERS_SPECS[roverSelected]?.cameras],
                  FORM_ERROR_MESSAGES.invalidStatus
              ),
          });
