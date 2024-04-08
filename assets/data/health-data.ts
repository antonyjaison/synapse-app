export type HealthDataTypes = {
    name: string;
    lastSync: string;
    healthMetrics: {
        steps: number;
        ecg: number;
        heartRate: number;
        oxygen: number;
    };
};


export const healthData: HealthDataTypes[] = [
    {
        name: "John Doe",
        lastSync: "32s ago",
        healthMetrics: {
            steps: 3456,
            ecg: 98, // Assuming ECG is in bpm or some other unit
            heartRate: 76, // bpm
            oxygen: 98, // Assuming this is a percentage
        }
    },
    {
        name: "Jane Smith",
        lastSync: "45s ago",
        healthMetrics: {
            steps: 2890,
            ecg: 102, // bpm or some other unit
            heartRate: 72, // bpm
            oxygen: 99, // percentage
        }
    }
];
