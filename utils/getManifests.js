import { httpGet } from "http/services/httpGet";

import { MISSION_MANIFEST } from "consts/endpoints";
import { CURIOSITY, OPPORTUNITY, SPIRIT } from "consts/rovers";

export const getManifests = async () => {
    let rovers_manifests = [];

    for (let rover of [CURIOSITY, SPIRIT, OPPORTUNITY]) {
        const { photo_manifest } = await httpGet(
            process.env.NEXT_PUBLIC_BASE_URL,
            `${MISSION_MANIFEST + rover}`
        );

        const manifest_formatted = {
            rover: photo_manifest?.name,
            max_sol: photo_manifest?.max_sol,
            max_date: photo_manifest?.max_date,
        };

        rovers_manifests.push(manifest_formatted);
    }

    return rovers_manifests;
};
