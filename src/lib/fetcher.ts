// 예: 서버에 데이터 저장하는 API
export async function saveItemToServer(item: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`✅ 저장 완료: ${item}`);
        }, 1000);
    });
}
