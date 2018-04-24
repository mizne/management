export class DividePackageInfo {
    id: string
    packageId: string
    packageName: string
    checked: boolean


    static generateFakeDataItems({ pageIndex, pageSize }): DividePackageInfo[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: '',
            packageId: `${i + (pageIndex - 1) * pageSize + 1}`,
            packageName: `分包${i + (pageIndex - 1) * pageSize + 1}`,
            checked: false
        }))
    }

    static generateFakeData(): DividePackageInfo {
        return {
            id: '',
            packageId: `${Math.random()
                .toString()
                .slice(0, 5)}`,
            packageName: `分包${Math.random()
                .toString()
                .slice(0, 5)}`,
            checked: false
        }
    }
}
