/**
 * Uploads a file to the server
 * @param file - The file to upload
 * @returns The URL of the uploaded file
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to upload file')
  }
  
  const data = await response.json()
  return data.url
}

/**
 * Handles a file input change event and uploads the file
 * @param e - The file input change event
 * @param onSuccess - Callback function called with the URL of the uploaded file
 * @param onError - Callback function called with the error message
 */
export async function handleFileUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
): Promise<void> {
  const file = e.target.files?.[0]
  
  if (!file) {
    onError('No file selected')
    return
  }
  
  try {
    const url = await uploadFile(file)
    onSuccess(url)
  } catch (error) {
    onError(error instanceof Error ? error.message : 'Failed to upload file')
  }
} 