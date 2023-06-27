import * as Yup from "yup";

import { FORM_ERROR_MESSAGES } from "consts/FormErrorMessages";

export const FiltersValidationSchema = () =>
    Yup.object({
        // error submit validations
        earth_date: Yup.date(FORM_ERROR_MESSAGES.date).nullable(),
        sol: Yup.number(FORM_ERROR_MESSAGES.number).nullable(),
        camera: Yup.string(FORM_ERROR_MESSAGES.string).nullable(),
    });
