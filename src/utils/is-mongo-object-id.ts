function byteSize(str: string): number {
  return new Blob([str]).size
}

export function isMongoObjectId(str: string): boolean {
  if (str.length !== 24) {
    return false
  }

  return byteSize(str) === 24
}
