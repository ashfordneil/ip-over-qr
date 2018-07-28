import { Scanned } from "instascan";

const getChecksum = (input: Scanned) => {
    return input.length.toString();
}

export default getChecksum;