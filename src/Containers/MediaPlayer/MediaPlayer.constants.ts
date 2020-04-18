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