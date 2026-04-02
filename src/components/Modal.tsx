import Button from './Button'
type Props = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const Modal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4">
        <p className="text-text-regular mb-6">{message}</p>
        <div className="flex gap-2.5 justify-end">
          <Button variant="normal" onClick={onCancel}>キャンセル</Button>
          <Button variant="primary" onClick={onConfirm}>OK</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
