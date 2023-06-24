export const CURIOSITY = "curiosity";
export const OPPORTUNITY = "opportunity";
export const SPIRIT = "spirit";

export const ROVERS_SPECS = {
    CURIOSITY: {
        rover_name: CURIOSITY,
        cameras: [
            "FHAZ",
            "RHAZ",
            "MAST",
            "CHEMCAM",
            "MAHLI",
            "MARDI",
            "NAVCAM",
        ],
    },
    OPPORTUNITY: {
        rover_name: OPPORTUNITY,
        cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
    SPIRIT: {
        rover_name: SPIRIT,
        cameras: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
    },
};
