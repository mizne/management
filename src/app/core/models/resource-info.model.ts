import * as uuid from 'uuid'

export class ResourceType {
    id?: string
    label: string

    private static cacheItems: ResourceType[] = []

    static generateFakeDataItems(): ResourceType[] {
        if (ResourceType.cacheItems.length === 0) {
            ResourceType.cacheItems = [
                {
                    id: uuid.v4(),
                    label: '软件资源'
                },
                {
                    id: uuid.v4(),
                    label: '计算资源'
                },
                {
                    id: uuid.v4(),
                    label: '存储资源'
                },
                {
                    id: uuid.v4(),
                    label: '数据库资源'
                },
                {
                    id: uuid.v4(),
                    label: 'IP地址资源'
                },
                {
                    id: uuid.v4(),
                    label: '防火墙访问权限资源'
                }
            ]
        }
        return ResourceType.cacheItems
    }

    static createFakeData(params: ResourceType): void {
        ResourceType.cacheItems.push({
            id: uuid.v4(),
            label: params.label
        })
    }

    static deleteFakeData(id: string): void {
        const index = ResourceType.cacheItems.findIndex(e => e.id === id)
        if (index >= 0) {
            ResourceType.cacheItems.splice(index, 1)
        }
    }
}

export class SoftwareType {
    id?: string
    label: string

    private static cacheItems: SoftwareType[] = []

    static generateFakeDataItems(): SoftwareType[] {
        if (SoftwareType.cacheItems.length === 0) {
            SoftwareType.cacheItems = [
                {
                    id: uuid.v4(),
                    label: '应用软件'
                },
                {
                    id: uuid.v4(),
                    label: '系统软件'
                },
                {
                    id: uuid.v4(),
                    label: '中间件'
                }
            ]
        }
        return SoftwareType.cacheItems
    }

    static createFakeData(params: SoftwareType): void {
        SoftwareType.cacheItems.push({
            id: uuid.v4(),
            label: params.label
        })
    }

    static deleteFakeData(id: string): void {
        const index = SoftwareType.cacheItems.findIndex(e => e.id === id)
        if (index >= 0) {
            SoftwareType.cacheItems.splice(index, 1)
        }
    }
}

export class SoftwareName {
    id?: string
    label: string

    private static cacheItems: SoftwareName[] = []

    static generateFakeDataItems(): SoftwareName[] {
        if (SoftwareName.cacheItems.length === 0) {
            SoftwareName.cacheItems = [
                {
                    id: uuid.v4(),
                    label: 'VSCode'
                },
                {
                    id: uuid.v4(),
                    label: 'Chrome'
                },
                {
                    id: uuid.v4(),
                    label: 'ExpressVPN'
                }
            ]
        }
        return SoftwareName.cacheItems
    }

    static createFakeData(params: SoftwareName): void {
        SoftwareName.cacheItems.push({
            id: uuid.v4(),
            label: params.label
        })
    }

    static deleteFakeData(id: string): void {
        const index = SoftwareName.cacheItems.findIndex(e => e.id === id)
        if (index >= 0) {
            SoftwareName.cacheItems.splice(index, 1)
        }
    }
}

export class SoftwareSpec {
    id?: string
    label: string

    private static cacheItems: SoftwareSpec[] = []

    static generateFakeDataItems(): SoftwareSpec[] {
        if (SoftwareSpec.cacheItems.length === 0) {
            SoftwareSpec.cacheItems = [
                {
                    id: uuid.v4(),
                    label: 'v1.2.1'
                },
                {
                    id: uuid.v4(),
                    label: 'v11.2.1'
                }
            ]
        }
        return SoftwareSpec.cacheItems
    }

    static createFakeData(params: SoftwareSpec): void {
        SoftwareSpec.cacheItems.push({
            id: uuid.v4(),
            label: params.label
        })
    }

    static deleteFakeData(id: string): void {
        const index = SoftwareSpec.cacheItems.findIndex(e => e.id === id)
        if (index >= 0) {
            SoftwareSpec.cacheItems.splice(index, 1)
        }
    }
}

export class UseEnvironment {
    id?: string
    label: string

    private static cacheItems: UseEnvironment[] = []

    static generateFakeDataItems(): UseEnvironment[] {
        if (UseEnvironment.cacheItems.length === 0) {
            UseEnvironment.cacheItems = [
                {
                    id: uuid.v4(),
                    label: 'Windows'
                },
                {
                    id: uuid.v4(),
                    label: 'Linux'
                },
                {
                    id: uuid.v4(),
                    label: 'MacOS'
                }
            ]
        }
        return UseEnvironment.cacheItems
    }

    static createFakeData(params: UseEnvironment): void {
        UseEnvironment.cacheItems.push({
            id: uuid.v4(),
            label: params.label
        })
    }

    static deleteFakeData(id: string): void {
        const index = UseEnvironment.cacheItems.findIndex(e => e.id === id)
        if (index >= 0) {
            UseEnvironment.cacheItems.splice(index, 1)
        }
    }
}
