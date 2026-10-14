import { Routes, Route } from 'react-router-dom';
import { TransitionProvider } from './context/TransitionContext';
import ScaleWrapper from './components/ScaleWrapper/ScaleWrapper';
import SectionLayout from './components/SectionLayout/SectionLayout';
import Home from './pages/Home/Home';
import Socios from './pages/QuemSomos/Socios/Socios';
import GrupoBalzani from './pages/QuemSomos/GrupoBalzani/GrupoBalzani';
import Zimbel from './pages/QuemSomos/Zimbel/Zimbel';
import Atta3D from './pages/QuemSomos/Atta3D/Atta3D';
import Empresarios from './pages/QuemSomos/Empresarios/Empresarios';
import Noticias from './pages/QuemSomos/Noticias/Noticias';
import Balzani from './pages/QuemSomos/Balzani/Balzani';
import Parceiros from './pages/QuemSomos/Parceiros/Parceiros';
import OndeAtuamos from './pages/QuemSomos/OndeAtuamos/OndeAtuamos';
import Reputacao from './pages/QuemSomos/Reputacao/Reputacao';
import Objetivo from './pages/Objetivo/Objetivo';
import FaltaResultado from './pages/Objetivo/FaltaResultado/FaltaResultado';
import ComoResolvemos from './pages/Objetivo/ComoResolvemos/ComoResolvemos';
import Iceberg from './pages/Objetivo/Iceberg/Iceberg';
import Resultados from './pages/Objetivo/Resultados/Resultados';
import ResultadosNumeros from './pages/Objetivo/ResultadosNumeros/ResultadosNumeros';
import Formula from './pages/Formula/Formula';
import Definicao from './pages/Estrategia/Definicao/Definicao';
import Atuacao from './pages/Estrategia/Atuacao/Atuacao';
import Cronograma from './pages/Estrategia/Cronograma/Cronograma.jsx';
import Cases from './pages/Estrategia/Cases/Cases';
import Entregaveis from './pages/Estrategia/Entregaveis/Entregaveis';
import EmBreve from './pages/EmBreve/EmBreve';

export default function App() {
  return (
    <ScaleWrapper>
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/quem-somos" element={<SectionLayout route="/quem-somos" />}>
            <Route index element={<Socios />} />
            <Route path="grupo-balzani" element={<GrupoBalzani />} />
            <Route path="zimbel" element={<Zimbel />} />
            <Route path="atta3d" element={<Atta3D />} />
            <Route path="empresarios" element={<Empresarios />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="balzani" element={<Balzani />} />
            <Route path="parceiros" element={<Parceiros />} />
            <Route path="onde-atuamos" element={<OndeAtuamos />} />
            <Route path="nossa-reputacao" element={<Reputacao />} />
            <Route path="*" element={<EmBreve embedded />} />
          </Route>

          <Route path="/objetivo">
            {/* abertura em tela cheia, sem menu lateral */}
            <Route index element={<Objetivo />} />
            {/* o Objetivo agora é um grupo do menu da Fórmula Vértice */}
            <Route element={<SectionLayout route="/formula" />}>
              {/* "/*" mantém a mesma instância nos passos (…/causas), para animar no lugar */}
              <Route path="falta-de-resultado/*" element={<FaltaResultado />} />
              <Route path="como-resolvemos/*" element={<ComoResolvemos />} />
              <Route path="iceberg-balzani" element={<Iceberg />} />
              <Route path="resultados" element={<Resultados />} />
              <Route path="resultados-em-numeros" element={<ResultadosNumeros />} />
              <Route path="*" element={<EmBreve embedded />} />
            </Route>
          </Route>

          <Route path="/estrategia" element={<SectionLayout route="/formula" />}>
            <Route index element={<Definicao />} />
            <Route path="atuacao" element={<Atuacao />} />
            <Route path="cronograma" element={<Cronograma />} />
            <Route path="cases" element={<Cases />} />
            <Route path="entregaveis" element={<Entregaveis />} />
            <Route path="*" element={<EmBreve embedded />} />
          </Route>

          {/* "/*" mantém a mesma instância no passo /formula/pilares, para animar no lugar */}
          <Route path="/formula/*" element={<Formula />} />
        </Routes>
      </TransitionProvider>
    </ScaleWrapper>
  );
}
