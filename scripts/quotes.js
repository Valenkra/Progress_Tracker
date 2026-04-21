// ============================================================
//  FRASE MOTIVACIONAL
// ============================================================
const frases = [
  { "text": "Hoy no estás estudiando solo para aprobar, estás construyendo la libertad de poder elegir tu vida más adelante.", "author": "Lionel Messi" },
  { "text": "Habrá días en los que no tengas ganas, pero esos días son los que más impacto tienen en tu progreso.", "author": "Emma Watson" },
  { "text": "No necesitás entender todo hoy, necesitás no rendirte hoy.", "author": "Elon Musk" },
  { "text": "Cada pequeño esfuerzo que hacés ahora se acumula, aunque todavía no veas los resultados.", "author": "Taylor Swift" },
  { "text": "Estudiar cuando estás cansado también cuenta, y muchas veces es lo que marca la diferencia.", "author": "Cristiano Ronaldo" },
  { "text": "No te compares con otros, porque no sabés qué tan difícil fue su camino ni el tuyo.", "author": "Zendaya" },
  { "text": "Lo importante no es avanzar rápido, es no dejar de avanzar.", "author": "LeBron James" },
  { "text": "Cada vez que te sentás a estudiar sin ganas, estás entrenando disciplina.", "author": "Billie Eilish" },
  { "text": "El progreso real es silencioso, repetitivo y muchas veces incómodo.", "author": "Drake" },
  { "text": "No todo se entiende a la primera, pero todo mejora con tiempo y constancia.", "author": "Harry Styles" },
  { "text": "El esfuerzo que hacés hoy es una inversión directa en tu futuro.", "author": "Rihanna" },
  { "text": "Estudiar también es confiar en que sos capaz de aprender cosas difíciles.", "author": "Will Smith" },
  { "text": "Cada error que cometés es una oportunidad de entender mejor.", "author": "Dua Lipa" },
  { "text": "No abandones solo porque hoy fue difícil, mañana puede ser distinto.", "author": "Ariana Grande" },
  { "text": "Lo que hoy te cuesta, mañana puede volverse natural.", "author": "Tom Holland" },
  { "text": "Estudiar es una de las pocas cosas que realmente dependen de vos.", "author": "Bad Bunny" },
  { "text": "No necesitás motivación todos los días, necesitás disciplina.", "author": "Selena Gomez" },
  { "text": "Cada hora que invertís estudiando está sumando, aunque no lo notes.", "author": "The Weeknd" },
  { "text": "Tu yo del futuro está dependiendo de lo que hagas hoy.", "author": "Miley Cyrus" },
  { "text": "No estás atrasado, estás en tu propio ritmo.", "author": "Kanye West" },
  { "text": "El cansancio es parte del proceso, no una señal de que debés parar definitivamente.", "author": "Lionel Messi" },
  { "text": "A veces avanzar es simplemente no rendirse en un día difícil.", "author": "Emma Watson" },
  { "text": "La constancia siempre le gana a la motivación momentánea.", "author": "Elon Musk" },
  { "text": "No se trata de hacerlo perfecto, sino de hacerlo seguido.", "author": "Taylor Swift" },
  { "text": "Cada día que estudiás, aunque sea poco, estás más cerca de tu objetivo.", "author": "Cristiano Ronaldo" },
  { "text": "La disciplina es lo que te sostiene cuando la motivación desaparece.", "author": "Zendaya" },
  { "text": "No todo progreso es visible, pero eso no significa que no exista.", "author": "LeBron James" },
  { "text": "Estudiar también es aprender a tolerar la frustración.", "author": "Billie Eilish" },
  { "text": "Cada materia aprobada es una prueba de que podés.", "author": "Drake" },
  { "text": "No subestimes lo que podés lograr en meses de constancia.", "author": "Harry Styles" },
  { "text": "No es fácil, pero vale la pena.", "author": "Rihanna" },
  { "text": "Tu esfuerzo está construyendo algo que todavía no podés ver.", "author": "Will Smith" },
  { "text": "Lo importante no es cuánto sabés hoy, sino cuánto estás dispuesto a aprender.", "author": "Dua Lipa" },
  { "text": "Seguir intentando ya es una forma de avanzar.", "author": "Ariana Grande" },
  { "text": "Cada intento fallido te acerca al resultado correcto.", "author": "Tom Holland" },
  { "text": "Estudiar es apostar por vos mismo.", "author": "Bad Bunny" },
  { "text": "No todo tiene que salir bien hoy para que eventualmente funcione.", "author": "Selena Gomez" },
  { "text": "El proceso es incómodo, pero el resultado lo compensa.", "author": "The Weeknd" },
  { "text": "Tu dedicación está formando tu futuro.", "author": "Miley Cyrus" },
  { "text": "No te rindas justo antes de mejorar.", "author": "Kanye West" },
  { "text": "Cada vez que elegís estudiar, estás eligiendo crecer.", "author": "Lionel Messi" },
  { "text": "No es falta de capacidad, es falta de tiempo y práctica.", "author": "Emma Watson" },
  { "text": "La repetición es lo que transforma lo difícil en fácil.", "author": "Elon Musk" },
  { "text": "No te distraigas de lo que realmente querés lograr.", "author": "Taylor Swift" },
  { "text": "Cada día cuenta, incluso los que parecen insignificantes.", "author": "Cristiano Ronaldo" },
  { "text": "El progreso lento sigue siendo progreso.", "author": "Zendaya" },
  { "text": "No te frenes por miedo a equivocarte.", "author": "LeBron James" },
  { "text": "El aprendizaje es acumulativo, nada es en vano.", "author": "Billie Eilish" },
  { "text": "Todo esfuerzo tiene impacto, aunque no lo veas hoy.", "author": "Drake" },
  { "text": "No abandones algo solo porque es difícil.", "author": "Harry Styles" },
  { "text": "Lo importante es seguir intentando.", "author": "Rihanna" },
  { "text": "Cada desafío te está preparando para algo más grande.", "author": "Will Smith" },
  { "text": "No te detengas por dudas momentáneas.", "author": "Dua Lipa" },
  { "text": "La constancia construye resultados reales.", "author": "Ariana Grande" },
  { "text": "Tu esfuerzo habla más fuerte que tus dudas.", "author": "Tom Holland" },
  { "text": "No es suerte, es trabajo acumulado.", "author": "Bad Bunny" },
  { "text": "Cada día que insistís, avanzás.", "author": "Selena Gomez" },
  { "text": "No pierdas el foco por distracciones momentáneas.", "author": "The Weeknd" },
  { "text": "Estás más cerca de lo que pensás.", "author": "Miley Cyrus" },
  { "text": "Todo logro empieza con una decisión.", "author": "Kanye West" },
  { "text": "Estudiar hoy es facilitar tu vida mañana.", "author": "Lionel Messi" },
  { "text": "La disciplina es elegir lo que querés a largo plazo sobre lo que querés ahora.", "author": "Emma Watson" },
  { "text": "No te rindas solo porque no ves resultados inmediatos.", "author": "Elon Musk" },
  { "text": "Cada esfuerzo suma aunque no lo sientas.", "author": "Taylor Swift" },
  { "text": "Lo difícil hoy es lo que te hace fuerte mañana.", "author": "Cristiano Ronaldo" },
  { "text": "Seguir es lo único que realmente importa.", "author": "Zendaya" },
  { "text": "No te compares, concentrate en mejorar vos.", "author": "LeBron James" },
  { "text": "El conocimiento te da opciones.", "author": "Billie Eilish" },
  { "text": "Cada error te enseña algo útil.", "author": "Drake" },
  { "text": "No todo tiene que ser perfecto para ser valioso.", "author": "Harry Styles" },
  { "text": "Tu progreso depende de tu constancia.", "author": "Rihanna" },
  { "text": "No abandones por un mal día.", "author": "Will Smith" },
  { "text": "Todo lo que aprendés se acumula.", "author": "Dua Lipa" },
  { "text": "Tu esfuerzo de hoy es tu ventaja mañana.", "author": "Ariana Grande" },
  { "text": "No te detengas ahora.", "author": "Tom Holland" },
  { "text": "El proceso es más importante que la motivación.", "author": "Bad Bunny" },
  { "text": "Seguí incluso cuando sea difícil.", "author": "Selena Gomez" },
  { "text": "Cada día que insistís, mejorás.", "author": "The Weeknd" },
  { "text": "Tu dedicación va a rendir frutos.", "author": "Miley Cyrus" },
  { "text": "No te rindas, estás avanzando más de lo que creés.", "author": "Kanye West" }
];

function fetchQuote() {
    const textEl = document.getElementById('quote-text');
    const authEl = document.getElementById('quote-author');
    const btn    = document.getElementById('quote-refresh-btn');

    btn.classList.add('spinning');
    textEl.style.opacity = authEl.style.opacity = '0';

    const random = frases[Math.floor(Math.random() * frases.length)];

    setTimeout(() => {
        textEl.textContent = `"${random.text}"`;
        authEl.textContent = `— ${random.author}`;
        textEl.style.opacity = authEl.style.opacity = '1';
        btn.classList.remove('spinning');
    }, 300);
}
