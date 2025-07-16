'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 max-w-2xl w-full text-base-content space-y-4">
        <h1 className="text-3xl font-bold text-primary text-center">¡Bienvenido/a a tu prueba de nivel de inglés! 🎉</h1>

        <p>¡Nos alegra mucho que estés aquí! Este pequeño examen es el primer paso para ayudarte a alcanzar tus metas con el CELPIP. No te preocupes, no es un examen como los de la escuela 😉. Es solo una herramienta para que podamos conocer tu nivel actual y ofrecerte la mejor orientación personalizada.</p>

        <div className="bg-accent text-accent-content rounded p-4">
          <p className="font-semibold">🌟 Recuerda:</p>
          <ul className="list-disc pl-6">
            <li>No importa si algunas preguntas son más difíciles que otras, lo importante es intentarlo.</li>
            <li>Tómate tu tiempo y responde con calma.</li>
            <li>¡Este es tu momento para brillar y demostrar todo lo que sabes!</li>
          </ul>
        </div>

        <p>Estamos aquí para apoyarte en cada paso de este camino. 💪 ¡Tú puedes lograrlo!</p>

        <p className="italic">Cuando termines, nos encargaremos de analizar tus respuestas y prepararnos para nuestra llamada. Así podremos ofrecerte las mejores estrategias para que te acerques cada vez más a tus objetivos.</p>

        <p className="text-center font-bold text-success text-lg">¡Buena suerte! 🚀</p>

        {/* Botón para iniciar el examen */}
        <div className="text-center pt-6">
          <Link href="/exam" className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-primary-dark transition-all">
            Comenzar examen
          </Link>
        </div>
      </div>
    </main>
  );
}


