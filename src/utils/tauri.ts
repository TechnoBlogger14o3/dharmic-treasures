/**
 * Tauri utility functions
 * Provides helpers to detect Tauri environment and use Tauri APIs
 */

// Check if running in Tauri
export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI__' in window
}

// Get Tauri API (with type safety)
export function getTauriAPI() {
  if (!isTauri()) {
    return null
  }
  // @ts-ignore - Tauri types will be available at runtime
  return window.__TAURI__
}

// Save text to file using Tauri
export async function saveTextToFile(content: string, filename: string): Promise<boolean> {
  if (!isTauri()) {
    // Fallback: download via browser
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    return true
  }

  try {
    // Dynamic imports only when in Tauri
    const { save } = await import('@tauri-apps/plugin-dialog')
    const { writeTextFile } = await import('@tauri-apps/plugin-fs')

    // Show save dialog
    const filePath = await save({
      defaultPath: filename,
      filters: [
        { name: 'Text', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })

    if (filePath) {
      await writeTextFile(filePath, content)
      return true
    }
    return false
  } catch (error) {
    console.error('Error saving file:', error)
    // Fallback to browser download if Tauri fails
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    return true
  }
}

// Show native notification
export async function showNotification(title: string, body: string): Promise<void> {
  if (!isTauri()) {
    // Fallback: Web Notification API
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body })
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        new Notification(title, { body })
      }
    }
    return
  }

  try {
    const { sendNotification } = await import('@tauri-apps/plugin-notification')
    await sendNotification({
      title,
      body,
    })
  } catch (error) {
    console.error('Error showing notification:', error)
  }
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isTauri()) {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }

  // Tauri notifications work without explicit permission on desktop
  return true
}

// Open file dialog
export async function openFileDialog(filters?: Array<{ name: string; extensions: string[] }>): Promise<string | null> {
  if (!isTauri()) {
    return null
  }

  try {
    const { open } = await import('@tauri-apps/plugin-dialog')
    const filePath = await open({
      multiple: false,
      filters: filters || [{ name: 'All Files', extensions: ['*'] }],
    })

    return typeof filePath === 'string' ? filePath : null
  } catch (error) {
    console.error('Error opening file dialog:', error)
    return null
  }
}

// Print content
export async function printContent(content: string): Promise<void> {
  if (!isTauri()) {
    // Fallback: browser print
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print</title></head>
          <body>${content}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
    return
  }

  // For Tauri, we can use shell to open print dialog
  // Or use the browser print fallback
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head><title>Print</title></head>
        <body>${content}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}
