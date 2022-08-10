import CopyStyles from './Copy.styles'

interface CopyProps {
  id: string
  rows: number
  size: 'large' | 'normal'
}

const Copy: React.FC<CopyProps> = ({ id, rows, size }) => {
  const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

  const checkDataInput = ({ target }: { target: HTMLTextAreaElement }) => {
    if (target.value.length === 0) {
      return target.value = defaultText;
    }
  }

  return (
    <CopyStyles
      id={id}
      rows={rows}
      defaultValue={defaultText}
      onBlur={checkDataInput}
      large={size === 'large'}
      normal={size === 'normal'}
    />
  )
}

export default Copy
