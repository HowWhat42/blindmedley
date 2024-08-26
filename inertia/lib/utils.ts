import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const textSanitizer = (text: string) => {
  text = text.toLowerCase()

  // Remove parentheses and content inside
  text = text.replaceAll(/ *\([^)]*\) */g, '')

  // Remove everything after "feat."
  if (text.includes('feat.')) text = text.split('feat.')[0]!

  // Remove everything after "ft."
  if (text.includes('ft.')) text = text.split('ft.')[0]!

  // Remove everything after " - "
  if (text.includes('- ')) text = text.split('- ')[0]!

  // Remove ponctuation
  text = text.replaceAll(/[.,/#!$%^&*;:{}=\\_`~()]/g, '')

  // Remove spaces
  text = text.replaceAll(/\s{2,}/g, ' ')

  // Convert french characters
  text = text.replaceAll(/é/g, 'e')
  text = text.replaceAll(/è/g, 'e')
  text = text.replaceAll(/ê/g, 'e')
  text = text.replaceAll(/à/g, 'a')
  text = text.replaceAll(/â/g, 'a')
  text = text.replaceAll(/î/g, 'i')
  text = text.replaceAll(/ï/g, 'i')
  text = text.replaceAll(/ô/g, 'o')
  text = text.replaceAll(/ö/g, 'o')
  text = text.replaceAll(/ù/g, 'u')
  text = text.replaceAll(/û/g, 'u')
  text = text.replaceAll(/ç/g, 'c')

  // replaceAll text numbers with numeric numbers
  text = text.replaceAll(/zero/g, '0')
  text = text.replaceAll(/one/g, '1')
  text = text.replaceAll(/two/g, '2')
  text = text.replaceAll(/three/g, '3')
  text = text.replaceAll(/four/g, '4')
  text = text.replaceAll(/five/g, '5')
  text = text.replaceAll(/six/g, '6')
  text = text.replaceAll(/seven/g, '7')
  text = text.replaceAll(/eight/g, '8')
  text = text.replaceAll(/nine/g, '9')

  text = text.replaceAll(/ten/g, '10')
  text = text.replaceAll(/eleven/g, '11')
  text = text.replaceAll(/twelve/g, '12')
  text = text.replaceAll(/thirteen/g, '13')
  text = text.replaceAll(/fourteen/g, '14')
  text = text.replaceAll(/fifteen/g, '15')
  text = text.replaceAll(/sixteen/g, '16')
  text = text.replaceAll(/seventeen/g, '17')
  text = text.replaceAll(/eighteen/g, '18')
  text = text.replaceAll(/nineteen/g, '19')

  text = text.replaceAll(/twenty/g, '20')
  text = text.replaceAll(/thirty/g, '30')
  text = text.replaceAll(/forty/g, '40')
  text = text.replaceAll(/fifty/g, '50')
  text = text.replaceAll(/sixty/g, '60')
  text = text.replaceAll(/seventy/g, '70')
  text = text.replaceAll(/eighty/g, '80')
  text = text.replaceAll(/ninety/g, '90')
  text = text.replaceAll(/hundred/g, '100')
  text = text.replaceAll(/thousand/g, '1000')

  // French numbers
  text = text.replaceAll(/un/g, '1')
  text = text.replaceAll(/deux/g, '2')
  text = text.replaceAll(/trois/g, '3')
  text = text.replaceAll(/quatre/g, '4')
  text = text.replaceAll(/cinq/g, '5')
  text = text.replaceAll(/six/g, '6')
  text = text.replaceAll(/sept/g, '7')
  text = text.replaceAll(/huit/g, '8')
  text = text.replaceAll(/neuf/g, '9')

  text = text.replaceAll(/dix/g, '10')
  text = text.replaceAll(/onze/g, '11')
  text = text.replaceAll(/douze/g, '12')
  text = text.replaceAll(/treize/g, '13')
  text = text.replaceAll(/quatorze/g, '14')
  text = text.replaceAll(/quinze/g, '15')
  text = text.replaceAll(/seize/g, '16')

  text = text.replaceAll(/vingt/g, '20')
  text = text.replaceAll(/trente/g, '30')
  text = text.replaceAll(/quarante/g, '40')
  text = text.replaceAll(/cinquante/g, '50')
  text = text.replaceAll(/soixante/g, '60')
  text = text.replaceAll(/cent/g, '100')
  text = text.replaceAll(/mille/g, '1000')

  return text
}

export const levenshtein = (a: string, b: string) => {
  if (a.length === 0) {
    return b.length
  }
  if (b.length === 0) {
    return a.length
  }

  if (a.length > b.length) {
    const tmp = a
    a = b
    b = tmp
  }

  const row = []
  for (let i = 0; i <= a.length; i++) {
    row[i] = i
  }

  for (let i = 1; i <= b.length; i++) {
    let prev = i
    for (let j = 1; j <= a.length; j++) {
      let val = 0
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        val = row[j - 1]!
      } else {
        val = Math.min(row[j - 1]! + 1, prev + 1, row[j]! + 1)
      }
      row[j - 1] = prev
      prev = val
    }
    row[a.length] = prev
  }

  return row[a.length]
}
