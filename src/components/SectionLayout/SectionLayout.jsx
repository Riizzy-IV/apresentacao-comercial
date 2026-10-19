import { Outlet, useLocation } from 'react-router-dom';
import { Canvas } from '../ScaleWrapper/ScaleWrapper';
import SectionSidebar from '../SectionSidebar/SectionSidebar';
import BottomNav from '../BottomNav/BottomNav';
import MenuPassos from '../MenuPassos/MenuPassos';
import { SECTIONS, findGroup, findItem } from '../../data/sections';

/**
 * Layout das sub-telas de uma seção: fundo, menu lateral e navegação inferior ficam fixos;
 * o conteúdo troca via <Outlet />. `route` = rota da seção em data/sections.js.
 * Seções com `groups` mostram todos os grupos no menu e usam o grupo atual como título.
 * Item com `menu` (ex.: Comercial) ganha o menu dos passos no canto superior direito.
 */
export default function SectionLayout({ route }) {
  const { pathname } = useLocation();
  const section = SECTIONS.find(s => s.route === route);
  const item = findItem(pathname);
  const passos = item?.menu && [item.route, ...item.steps].map((rota, i) => ({ rota, label: item.menu[i] }));

  const group = section.groups && findGroup(section, pathname);
  const sidebar = section.groups
    ? { title: group?.label ?? section.label, logo: group?.logo, groups: section.groups }
    : { title: section.label, group: section.sidebarGroup, items: section.children.filter(c => !c.intro && !c.hidden) };

  return (
    <section style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, var(--color-navy-800), var(--color-navy-900))',
    }}>
      <Canvas>
        <Outlet />
        {passos && <MenuPassos itens={passos} />}
        <SectionSidebar {...sidebar} />
        <BottomNav />
      </Canvas>
    </section>
  );
}
