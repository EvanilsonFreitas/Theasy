import type { CSSProperties } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const items = [
  {
    quote: 'Vocês precisam de um dashboard.',
    answer: 'Não antes de entender a pergunta.',
    body: 'Às vezes a resposta é um painel. Às vezes é rever o processo, automatizar uma rotina, estruturar os dados ou revisar a formação de preço. O diagnóstico decide, não uma ferramenta escolhida de antemão.',
  },
  {
    quote: 'Isso é com o pessoal de TI.',
    answer: 'Negócio e tecnologia ficam na mesma mesa.',
    body: 'Quem modela os dados entende de margem, custo e processo. Quem discute preço entende de dados. A conversa não se perde entre áreas.',
  },
  {
    quote: 'Só a gente sabe mexer nisso.',
    answer: 'A entrega é da sua empresa.',
    body: 'Documentação, definições claras e transferência de conhecimento fazem parte do escopo. A sua equipe precisa conseguir operar o que foi construído.',
  },
]

/** Posicionamento por contraste: três frases que a ThEasy recusa. */
export function NotSection() {
  return (
    <section
      aria-labelledby="nao-title"
      className="border-rule border-b py-16 sm:py-24 lg:py-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="nao-title"
            label="§ 05 · O que não fazemos"
            title={'Três frases que\nvocê não vai ouvir\nda ThEasy.'}
            layout="stack"
          />
        </div>
        <ul className="border-ink border-t">
          {items.map((it, i) => (
            <li
              key={it.quote}
              data-rise=""
              style={{ '--i': i } as CSSProperties}
              className="border-rule grid gap-3 border-b py-7 sm:py-9"
            >
              <p className="type-h3">
                <del className="text-ink-3 decoration-[1.5px]">
                  “{it.quote}”
                </del>
                <span className="sr-only">: </span>
                <span className="block">{it.answer}</span>
              </p>
              <p className="text-ink-2 max-w-[38em] leading-relaxed">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
