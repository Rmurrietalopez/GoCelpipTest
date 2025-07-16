'use client';

import Image from 'next/image';
import { useExam } from '@/context/ExamContext';
import Link from 'next/link';

const questions = [
  {
    text: "Most pet owners seem to prefer having 1. ▾ .",
    options: ['CATS', 'DOGS', 'MULTIPLE PETS', 'PETS IN CAGES'],
  },
  {
    text: "I’m wondering 2. ▾ .",
    options: [
      'whether they need special food',
      'whether any can be trained',
      'why they are not as popular',
      'why there are no positive points',
    ],
  },
  {
    text: "like your points about cats and dogs, especially regarding their 3. ▾ .",
    options: ['training ability', 'medical needs', 'food requirements', 'overall popularity'],
  },
  {
    text: "I guess dogs are popular because, as you’ve mentioned, they 4. ▾ .",
    options: ['share their affection', 'can run in the wild', 'can adapt to indoor living', 'look very attractive'],
  },
  {
    text: "even a rabbit or a ferret can be 5. ▾ ,",
    options: ['easily trained', 'very hard', 'easily fed', 'very affectionate'],
  },
  {
    text: "6. What does Bob mainly want advice about? ▾",
    options: [
      'adding a second pet to his family',
      'the most suitable dog breed for kids',
      'the benefits of fish and birds as pets',
      'caring for pet rabbits and ferrets',
    ],
  },
  {
    text: "7. What does Bob suggest about his kids? ▾",
    options: [
      'They need to get more exercise.',
      'They prefer not to follow traditions.',
      'They are very young children.',
      'They are not very responsible.',
    ],
  },
  {
    text: "8. What do Bob’s friends say about dogs? ▾",
    options: [
      'They are the best pets.',
      'They require a lot of work.',
      'They benefit mental health.',
      'They help people stay fit.',
    ],
  },
];

export default function Test1() {
  const { answers, setAnswers } = useExam();

  // Handle the option change for each question
  const handleChange = (i: number, oi: number) => {
    setAnswers((prev) => ({
      ...prev,
      reading: { ...prev.reading, [i]: oi }, // This stores the option index in the state
    }));
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Reading Test 1</h1>

    <p className="font-semibold">
        Read the following email message about the diagram on the left. Complete the email by filling in the blanks.
        Select the best choice for each blank.
    </p>

      <div className="flex justify-center mb-6">
        <Image
          src="/assets/reading1.png"
          width={600}
          height={800}
          alt="Reading"
          className="rounded shadow max-h-[80vh] object-contain"
        />
      </div>


      <div className="space-y-4 mt-6">
        <p>
          Hello Angie, <br />
          I received your flyer in my mailbox and the timing was perfect. Now that our kids are old enough for pet maintenance, we’d like to add a furry four-legged member to our family. <br />
          Most pet owners seem to prefer having{' '}
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[0] !== undefined ? answers.reading[0] : ''}
              onChange={(e) => handleChange(0, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[0].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
          . However, our kids, as usual, want to do things differently! With the category “other pets,” I’m wondering{' '}
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[1] !== undefined ? answers.reading[1] : ''}
              onChange={(e) => handleChange(1, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[1].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
          . It would be great to have more details about this group, like your points about cats and dogs, especially regarding their{' '}
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[2] !== undefined ? answers.reading[2] : ''}
              onChange={(e) => handleChange(2, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[2].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
          .
        </p>

        <p>
          I guess dogs are popular because, as you’ve mentioned, they{' '}
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[3] !== undefined ? answers.reading[3] : ''}
              onChange={(e) => handleChange(3, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[3].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
          . My best friends say spending time playing and walking with them relieves stress from work too. However, as you suggest, even a rabbit or a ferret can be{' '}
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[4] !== undefined ? answers.reading[4] : ''}
              onChange={(e) => handleChange(4, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[4].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
          , and I think either of those would be great for beginner pet-owners.
        </p>

        <p className="font-semibold mt-4">
          6. What does Bob mainly want advice about?
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[5] !== undefined ? answers.reading[5] : ''}
              onChange={(e) => handleChange(5, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[5].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
        </p>

        <p className="font-semibold mt-4">
          7. What does Bob suggest about his kids?
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[6] !== undefined ? answers.reading[6] : ''}
              onChange={(e) => handleChange(6, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[6].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
        </p>

        <p className="font-semibold mt-4">
          8. What do Bob’s friends say about dogs?
          <span className="inline-block">
            <select
              className="select select-primary w-full py-2 px-4 border border-gray-300 rounded-md"
              value={answers.reading[7] !== undefined ? answers.reading[7] : ''}
              onChange={(e) => handleChange(7, parseInt(e.target.value))}
            >
              <option disabled value="">
                Choose an option
              </option>
              {questions[7].options.map((o, oi) => (
                <option key={oi} value={oi}>
                  {o}
                </option>
              ))}
            </select>
          </span>
        </p>

        <Link href="/exam/reading/test2" className="w-auto py-2 px-6 mt-6 mx-auto block bg-primary text-white text-center rounded">
          Continue to Reading Test 2
        </Link>
      </div>
    </main>
  );
}













