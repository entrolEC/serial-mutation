'use client';

import { useCallback, useRef } from 'react';
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from '@tanstack/react-query';

/**
 * 직렬화: mutateAsync 호출을 큐에 연결하여 항상 1개씩 순차 실행
 * - runningRef는 이전 작업의 Promise를 기억하고, 새 작업을 그 뒤에 연결
 */
export function useSerialMutation<TData, TError, TVars>(
    mutationOptions: UseMutationOptions<TData, TError, TVars>
): UseMutationResult<TData, TError, TVars> & {
    mutateSerial: (vars: TVars) => Promise<TData>;
} {
    const base = useMutation<TData, TError, TVars>(mutationOptions);
    const runningRef = useRef<Promise<unknown>>(Promise.resolve());

    const mutateSerial = useCallback(
        async (vars: TVars) => {
            const run = () => base.mutateAsync(vars);

            // 기존 체인이 있으면 그 뒤에 연결
            runningRef.current = runningRef.current.then(run, run)

            // 타입 보정을 위해 as unknown as Promise<TData>
            return runningRef.current as unknown as Promise<TData>
        },
        [base]
    );

    return Object.assign(base, { mutateSerial });
}
