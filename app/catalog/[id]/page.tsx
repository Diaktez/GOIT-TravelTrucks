import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { Camper } from '@/types/camper';
import CamperDetails from './CamperDetails';
import css from './page.module.css';

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getCamperDetails(id: string): Promise<Camper | null> {
  try {
    const { data } = await api.get<Camper>(`/campers/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch camper with ID: ${id}`, error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const camper = await getCamperDetails(id);

  if (!camper) {
    return {
      title: 'Camper Not Found',
    };
  }

  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description.slice(0, 150),
  };
}

export default async function CamperDetailPage({ params }: Props) {
  const { id } = await params;
  // await wait(2000);
  const camper = await getCamperDetails(id);

  if (!camper) {
    notFound();
  }

  return (
    <div className={`container ${css.content}`}>
      <h1 className="visually-hidden">Campers detail: {camper.name}</h1>
      <CamperDetails camper={camper} />
    </div>
  );
}
