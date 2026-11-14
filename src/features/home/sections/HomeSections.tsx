import { Link } from 'react-router-dom'
import { Section, SectionHead } from '@/components/system/Section'
import { Transformation } from '@/components/scenario/Transformation'
import { ProcessStepper } from '@/components/process/ProcessStepper'
import { AreaExplorer } from '@/components/areas/AreaExplorer'
import { CompetenceGraphic } from '@/components/system/CompetenceGraphic'
import { principles } from '@/content/principles'

/** 03 · Do problema à solução. */
export function ApplicationsSection() {
  return (
    <Section id="aplicacoes" tone="paper" labelledBy="aplicacoes-title">
      <SectionHead
        id="aplicacoes-title"
        label="03 · Aplicações"
        title="Do problema à solução, em situações comuns."
        intro={
          <p>
            Escolha uma área e veja como um problema típico ganha estrutura: o
            que existe hoje, como a ThEasy intervém e o que passa a ser possível
            decidir.
          </p>
        }
      />
      <div className="mt-10">
        <Transformation />
      </div>
    </Section>
  )
}

/** 04 · Como trabalhamos. */
export function ProcessSection() {
  return (
    <Section id="abordagem" labelledBy="abordagem-title">
      <SectionHead
        id="abordagem-title"
        label="04 · Como trabalhamos"
        title="Cinco etapas, cada uma com uma entrega concreta."
        intro={
          <p>
            Selecione uma etapa para ver o que acontece e o que sua equipe
            recebe.{' '}
            <Link
              to="/abordagem"
              className="text-ink decoration-line font-[560] underline underline-offset-4 hover:text-purple-600"
            >
              Método completo
            </Link>
          </p>
        }
      />
      <div className="mt-10 lg:mt-12">
        <ProcessStepper />
      </div>
    </Section>
  )
}

/** 05 · Onde atuamos. */
export function AreasSection() {
  return (
    <Section id="areas" tone="paper" labelledBy="areas-title">
      <SectionHead
        id="areas-title"
        label="05 · Onde atuamos"
        title="As mesmas competências, aplicadas a cada área da empresa."
        intro={
          <p>
            Escolha uma área para ver os desafios típicos e como a solução
            costuma se organizar.
          </p>
        }
      />
      <div className="mt-10">
        <AreaExplorer />
      </div>
    </Section>
  )
}

/** 06 · Sobre a ThEasy. */
export function AboutSection() {
  return (
    <Section id="sobre" labelledBy="sobre-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-5">
          <p className="type-mono text-ink-3">06 · Sobre a ThEasy</p>
          <h2 id="sobre-title" className="type-h2">
            Consultoria que entende o negócio. Engenharia que entrega a solução.
          </h2>
          <p className="type-lead text-ink-2">
            A ThEasy reúne visão de gestão, dados e desenvolvimento de software.
            Partimos da necessidade da empresa e estruturamos a resposta
            adequada, da análise à solução em uso.
          </p>
          <ol className="border-rule mt-2 border-t">
            {principles.slice(0, 3).map((p, i) => (
              <li
                key={p.title}
                className="border-rule grid grid-cols-[40px_minmax(0,1fr)] border-b py-3.5 text-[15px] leading-relaxed"
              >
                <span className="type-mono pt-1 text-purple-600">0{i + 1}</span>
                <span>
                  <strong className="font-semibold">{p.title}.</strong>{' '}
                  <span className="text-ink-2">{p.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <Link
            to="/sobre"
            className="decoration-line inline-flex min-h-11 items-center gap-2 self-start font-[560] underline underline-offset-4 hover:text-purple-600"
          >
            Conhecer a ThEasy <span aria-hidden="true">→</span>
          </Link>
        </div>
        <CompetenceGraphic />
      </div>
    </Section>
  )
}
