export enum MediaPlayerMode {
    Soundcloud = 'Soundcloud',
    Youtube = 'Youtube'
}

export enum TimerMode {
    RemainingTime = 'RemainingTime',
    PlayedTime = 'PlayedTime'
}

export interface ProgressTime {
    dashCharacter: string;
    minutesDisplayed: string;
    secondsDisplayed: string;
}

export enum LoopMode {
    NoLoop = 'NoLoop',
    LoopCurrent = 'LoopCurrent'
}

export enum KeyCodes {
    ArrowRight = 39,
    ArrowLeft = 37,
    Space = 32,
    Enter = 13
}