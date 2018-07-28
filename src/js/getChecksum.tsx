import { Scanned } from "instascan";
import crc32 from 'crc/crc32';

const getChecksum = (input: Scanned) =>
    crc32(input).toString(16);

export default getChecksum;