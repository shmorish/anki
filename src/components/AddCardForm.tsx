import { useState } from 'react'
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Programming, Math, History"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="front">Question (Front)</label>
            <textarea
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Enter the question..."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="back">Answer (Back)</label>
            <textarea
              id="back"
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
