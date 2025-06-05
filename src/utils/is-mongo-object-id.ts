const byteSize = (str: string) => new Blob([str]).size

export function isMongoObjectId(str: string): boolean {
  if (str.length !== 24) {
    return false
  }

  return byteSize(str) === 24
}
