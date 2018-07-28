declare module 'instascan' {
    export interface CameraThing {
    }

    export class Camera {
        static getCameras(): CameraThing[]
    }

    export interface ScanData {
        content: {}
    }

    export class Scanner {
        constructor(props: {});
        start(camera: CameraThing | null): {}
        stop(): void
        scan(): ScanData | null
    }
}