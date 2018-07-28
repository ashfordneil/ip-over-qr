declare module 'instascan' {
    export interface CameraThing {
    }

    export class Camera {
        static getCameras(): CameraThing[]
    }

    export type Scanned = string;

    export interface ScanData {
        content: Scanned
    }

    export class Scanner {
        constructor(props: {});
        start(camera: CameraThing | null): {}
        stop(): void
        scan(): ScanData | null
    }
}