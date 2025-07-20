export function generateFileName(prefix = 'log'): string {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')

  const year = now.getFullYear()
  const month = pad(now.getMonth() + 1)
  const day = pad(now.getDate())
  const hour = pad(now.getHours())
  const minute = pad(now.getMinutes())
  const second = pad(now.getSeconds())

  return `${prefix}-${year}-${month}-${day}-${hour}-${minute}-${second}.md`
}
