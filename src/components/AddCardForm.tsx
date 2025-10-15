import { useId, useState } from 'react'
import type { Flashcard } from '../types/flashcard'
import './AddCardForm.css'

interface AddCardFormProps {
  onAddCard: (card: Omit<Flashcard, 'id'>) => void
  onClose: () => void
}

export default function AddCardForm({ onAddCard, onClose }: AddCardFormProps) {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categoryId = useId()
  const frontId = useId()
  const backId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (front.trim() && back.trim() && category.trim()) {
      setIsSubmitting(true)

      // Create GitHub Issue URL
      const repoUrl = 'https://github.com/shmorish/anki'
      const issueUrl = `${repoUrl}/issues/new?template=add-flashcard.yml&title=[CARD]%20${encodeURIComponent(category.trim())}&category=${encodeURIComponent(category.trim())}&front=${encodeURIComponent(front.trim())}&back=${encodeURIComponent(back.trim())}`

      // Open GitHub Issue in new tab
      window.open(issueUrl, '_blank')

      // Also add locally for immediate feedback
      onAddCard({
        front: front.trim(),
        back: back.trim(),
        category: category.trim(),
      })

      setFront('')
      setBack('')
      setCategory('')
      setIsSubmitting(false)
      onClose()
    }
  }

  const handleOverlayClick = () => {
    onClose()
  }

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={-1}
    >
      <div
        className="modal-content"
        onClick={handleContentClick}
        onKeyDown={handleContentKeyDown}
        role="dialog"
        tabIndex={-1}
      >
        <h2>Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={categoryId}>Category</label>
            <input
              id={categoryId}
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Programming, Math, History"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={frontId}>Question (Front)</label>
            <textarea
              id={frontId}
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Enter the question..."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={backId}>Answer (Back)</label>
            <textarea
              id={backId}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Enter the answer..."
              rows={3}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Issue...' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
