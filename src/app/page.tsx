'use client';

import React, { useState } from 'react';
import {saveItemToServer} from "@/lib/fetcher";
import {useSerialMutation} from "@/lib/useSerialMutation";

export default function SerialMutationExample() {
    const [logs, setLogs] = useState<string[]>([]);

    // useSerialMutation 사용
    const mutation = useSerialMutation<string, Error, string>({
        mutationFn: saveItemToServer,
        onSuccess: (data) => {
            setLogs((prev) => [...prev, data]);
        },
        onError: (error) => {
            setLogs((prev) => [...prev, `❌ 에러: ${error.message}`]);
        },
    });

    // 버튼 클릭 시 여러 요청을 순차적으로 실행
    const handleClick = async () => {
      mutation.mutateSerial('첫 번째 요청');
      mutation.mutateSerial('두 번째 요청');
      mutation.mutateSerial('세 번째 요청');
    };

    return (
        <div className="p-4">
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleClick}
                disabled={mutation.isPending}
            >
                순차 실행 시작
            </button>

            <div className="mt-4 space-y-2">
                {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}
            </div>
        </div>
    );
}
