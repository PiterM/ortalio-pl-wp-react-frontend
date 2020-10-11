export enum MediaPlayerMode {
    Soundcloud = 'Soundcloud',
    Youtube = 'Youtube'
}

export enum TimerMode {
    RemainingTime = 'RemainingTime',
    PlayedTime = 'PlayedTime'
}

export interface ProgressTimeFormat {
    dashCharacter: string;
    minutesDisplayed: string;
    secondsDisplayed: string;
}

export interface ProgressTime {
    remainingTime: ProgressTimeFormat;
    elapsedTime: ProgressTimeFormat
}

export enum LoopMode {
    NoLoop = 'NoLoop',
    LoopCurrent = 'LoopCurrent'
}

export enum KeyCodes {
    ArrowRight = 39,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowDown = 40,
    Space = 32,
    Enter = 13
}