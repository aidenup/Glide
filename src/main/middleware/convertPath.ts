/**
 * 传入路径返回对应操作系统下的路径
 * @param path
 * @param platform
 */
export function convertPath(path: string, platform: 'win' | 'darwin' | 'linux' = 'darwin') {
  let newPath = path
  if (platform === 'win') {
    // Windows 系统
    newPath = path.replace(/\//g, '\\')
  } else if (platform === 'linux' || process.platform === 'darwin') {
    // Linux 和 macOS 系统
    newPath = path.replace(/\\/g, '/')
  }
  return newPath
}
