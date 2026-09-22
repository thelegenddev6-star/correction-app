 import { useState, useRef } from 'react'

function TextInput({ onAction }) {
  const [text, setText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLang, setTargetLang] = useState('en')
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  const handleCorrect = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://correction-app-arpo.onrender.com/api/correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      const fixed = applyCorrections(text, data.matches)
      setCorrectedText(fixed)
      onAction({ type: 'Correction', snippet: fixed.slice(0, 40) + '...' })
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const handleTranslate = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://correction-app-arpo.onrender.com/api/translation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang }),
      })
      const data = await response.json()
      setTranslatedText(data.translatedText)
      onAction({ type: 'Traduction', snippet: data.translatedText.slice(0, 40) + '...' })
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const applyCorrections = (original, matches) => {
    let result = original
    const sorted = [...matches].sort((a, b) => b.offset - a.offset)

    for (const match of sorted) {
      if (match.replacements.length > 0) {
        const suggestion = match.replacements[0].value
        const before = result.slice(0, match.offset)
        const after = result.slice(match.offset + match.length)
        result = before + suggestion + after
      }
    }
    return result
  }

  const wrapSelection = (marker) => {
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return

    const before = text.slice(0, start)
    const selected = text.slice(start, end)
    const after = text.slice(end)

    setText(before + marker + selected + marker + after)
  }

  const renderFormatted = (raw) => {
    let html = raw
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
    html = html.replace(/__(.+?)__/g, '<u>$1</u>')
    return { __html: html }
  }

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écrivez votre texte ici..."
        style={{ width: '100%', minHeight: '260px', resize: 'vertical' }}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        <button onClick={handleCorrect} disabled={loading}>
          {loading ? 'Correction en cours...' : 'Corriger'}
        </button>

        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
          <option value="de">Allemand</option>
        </select>
        <button onClick={handleTranslate} disabled={loading}>
          {loading ? 'Traduction en cours...' : 'Traduire'}
        </button>

        <button onClick={() => wrapSelection('**')} style={{ fontWeight: 'bold' }}>G</button>
        <button onClick={() => wrapSelection('*')} style={{ fontStyle: 'italic' }}>I</button>
        <button onClick={() => wrapSelection('__')} style={{ textDecoration: 'underline' }}>S</button>
      </div>

      {text && (
        <div className="result-block">
          <h3>Aperçu mis en forme</h3>
          <p dangerouslySetInnerHTML={renderFormatted(text)}></p>
        </div>
      )}

      {correctedText && (
        <div className="result-block">
          <h3>Texte corrigé</h3>
          <p>{correctedText}</p>
        </div>
      )}

      {translatedText && (
        <div className="result-block translation">
          <h3>Texte traduit</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  )
}

export default TextInput
