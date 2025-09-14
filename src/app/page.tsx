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
    const handleClick = () => {
      for (let i = 0; i < 3; i++) {
        mutation.mutateSerial(`${new Date().toLocaleTimeString()}에 발생한 요청`);
      }
    };

    return (
        <div className="p-4">
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                onClick={handleClick}
            >
                요청 3개 실행
            </button>

            <div className="mt-4 space-y-2">
                {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}
            </div>
        </div>
    );
}
