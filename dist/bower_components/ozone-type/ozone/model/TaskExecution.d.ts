export interface TaskExecution {
    taskId?: string;
    groupId?: string;
    completed?: boolean;
    submitionDate?: number;
    completionDate?: number;
    stepsCount?: number;
    stepsDone?: number;
    error?: string;
    taskResult?: any;
    progressMessage?: string;
    progressPercent?: number;
}
