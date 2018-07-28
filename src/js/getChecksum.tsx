import { Scanned } from "instascan";
import crc32 from 'crc/crc32';

const getChecksum = (input: Scanned, num: number) =>
    crc32(`${num}|input`).toString(16);

export default getChecksum;