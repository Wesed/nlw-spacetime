'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    // recebe a img e transforma num URL
    if (files && files.length) {
      const previewURL = URL.createObjectURL(files[0])
      setPreview(previewURL)
    }
  }

  return (
    <>
      <input
        name="coverUrl"
        onChange={onFileSelected}
        type="file"
        id="media"
        accept="image/*" // aceita somente imagens
        className="invisible h-0 w-0"
      />

      {preview && (
        // como nao precisa otimizar a img pq e so preview, nao precisa otimizar com o Image
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
