declare module 'instascan' {
    export interface CameraThing {
    }

    export class Camera {
        static getCameras(): CameraThing[]
    }

    export class Scanner {
        constructor(props: {});
        start(camera: CameraThing | null): {}
    }
}