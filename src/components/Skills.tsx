import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ElementType, PointerEvent as ReactPointerEvent } from 'react';
import { skillsData } from '../data/skills';
import { SectionWrapper } from './SectionWrapper';

type CategoryKey = keyof typeof skillsData;
type NodeKind = 'category' | 'skill';

interface Point {
  x: number;
  y: number;
}

interface SkillItem {
  name: string;
  icon: ElementType;
  description: string;
}

interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  category: CategoryKey;
  description?: string;
}

interface GraphLink {
  id: string;
  source: string;
  target: string;
  strength: 'core' | 'branch' | 'web';
}

interface GraphModel {
  nodes: GraphNode[];
  links: GraphLink[];
  initialPositions: Record<string, Point>;
  adjacency: Record<string, string[]>;
  nodeMap: Record<string, GraphNode>;
  defaultSkillId: string;
}

interface DragState {
  nodeId: string;
  point: Point;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getNodeVisualRadius = (node: GraphNode) => {
  if (node.kind === 'category') {
    return 5.8;
  }
  return clamp(2.6 + node.label.length * 0.24, 3.2, 7.2);
};

const toId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const makeSeededRandom = (seed: number) => {
  let current = seed >>> 0;
  return () => {
    current = (current * 1664525 + 1013904223) >>> 0;
    return current / 4294967296;
  };
};

const pointDistance = (a: Point, b: Point) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const SEARCH_HUB_CENTER: Point = { x: 50, y: 50 };
const SEARCH_HUB_HALF_WIDTH = 22;
const SEARCH_HUB_HALF_HEIGHT = 10.5;

const getSearchHubPadding = (node: GraphNode) => {
  if (node.kind === 'category') {
    return 8;
  }
  return clamp(5 + node.label.length * 0.42, 7, 16);
};

const getNodePhase = (nodeId: string) => {
  let hash = 0;
  for (let i = 0; i < nodeId.length; i += 1) {
    hash = (hash * 31 + nodeId.charCodeAt(i)) % 4096;
  }
  return (hash / 4096) * Math.PI * 2;
};

const categoryMeta: Record<
  CategoryKey,
  {
    label: string;
    color: string;
    anchor: Point;
  }
> = {
  frontend: { label: 'Frontend', color: '#a78bfa', anchor: { x: 8, y: 16 } },
  backend: { label: 'Backend', color: '#7c3aed', anchor: { x: 50, y: 8 } },
  database: { label: 'Database', color: '#60a5fa', anchor: { x: 92, y: 16 } },
  core: { label: 'Core', color: '#38bdf8', anchor: { x: 88, y: 88 } },
  tools: { label: 'Tools', color: '#22d3ee', anchor: { x: 12, y: 88 } },
};

const categoryOrder: CategoryKey[] = ['frontend', 'backend', 'database', 'core', 'tools'];

const excludedBasicSkills = new Set([
  'Vite',
  'SOLID',
  'DSA',
  'OOP',
  'Collections',
  'Git',
  'GitHub',
  'Linux',
  'VS Code',
]);

const buildGraph = (): GraphModel => {
  const rng = makeSeededRandom(4517);
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const initialPositions: Record<string, Point> = {};
  const nodeMap: Record<string, GraphNode> = {};
  const linkIdSet = new Set<string>();
  const skillsByCategory: Record<CategoryKey, string[]> = {
    frontend: [],
    backend: [],
    database: [],
    core: [],
    tools: [],
  };

  const addLink = (source: string, target: string, strength: GraphLink['strength']) => {
    if (source === target) {
      return;
    }
    const id = [source, target].sort().join('__');
    if (linkIdSet.has(id)) {
      return;
    }
    linkIdSet.add(id);
    links.push({ id, source, target, strength });
  };

  categoryOrder.forEach((categoryKey) => {
    const categoryNodeId = `cat-${categoryKey}`;
    const categoryNode: GraphNode = {
      id: categoryNodeId,
      label: categoryMeta[categoryKey].label,
      kind: 'category',
      category: categoryKey,
    };

    nodes.push(categoryNode);
    nodeMap[categoryNode.id] = categoryNode;

    initialPositions[categoryNode.id] = {
      x: clamp(categoryMeta[categoryKey].anchor.x + (rng() - 0.5) * 6, 4, 96),
      y: clamp(categoryMeta[categoryKey].anchor.y + (rng() - 0.5) * 6, 4, 96),
    };

    const skills = (skillsData[categoryKey] as SkillItem[]).filter(
      (skill) => !excludedBasicSkills.has(skill.name),
    );
    skills.forEach((skill, index) => {
      const skillNodeId = `skill-${categoryKey}-${toId(skill.name)}`;
      const skillNode: GraphNode = {
        id: skillNodeId,
        label: skill.name,
        kind: 'skill',
        category: categoryKey,
        description: skill.description,
      };

      nodes.push(skillNode);
      nodeMap[skillNode.id] = skillNode;
      skillsByCategory[categoryKey].push(skillNodeId);

      const angle = ((index + 1) / (skills.length + 1)) * Math.PI * 1.85 + rng() * 0.9;
      const radius = 24 + rng() * 28;

      initialPositions[skillNode.id] = {
        x: clamp(categoryMeta[categoryKey].anchor.x + Math.cos(angle) * radius + (rng() - 0.5) * 4, 2, 98),
        y: clamp(categoryMeta[categoryKey].anchor.y + Math.sin(angle) * radius + (rng() - 0.5) * 4, 2, 98),
      };

      addLink(categoryNodeId, skillNodeId, 'branch');

      if (index > 0) {
        addLink(skillNodeId, skillsByCategory[categoryKey][index - 1], 'web');
      }
      if (index < skills.length - 1) {
        addLink(skillNodeId, `skill-${categoryKey}-${toId(skills[index + 1].name)}`, 'web');
      }
    });

    if (skillsByCategory[categoryKey].length > 2) {
      addLink(
        skillsByCategory[categoryKey][0],
        skillsByCategory[categoryKey][skillsByCategory[categoryKey].length - 1],
        'web',
      );
    }
  });

  categoryOrder.forEach((key, index) => {
    const currentCategoryId = `cat-${key}`;
    const nextCategoryId = `cat-${categoryOrder[(index + 1) % categoryOrder.length]}`;
    addLink(currentCategoryId, nextCategoryId, 'core');
  });

  const allSkillNodes = nodes.filter((node) => node.kind === 'skill');
  allSkillNodes.forEach((skillNode) => {
    let linksAdded = 0;
    let attempts = 0;
    while (linksAdded < 3 && attempts < 40) {
      attempts += 1;
      const candidate = allSkillNodes[Math.floor(rng() * allSkillNodes.length)];
      if (!candidate || candidate.id === skillNode.id || candidate.category === skillNode.category) {
        continue;
      }
      const beforeCount = links.length;
      addLink(skillNode.id, candidate.id, 'web');
      if (links.length > beforeCount) {
        linksAdded += 1;
      }
    }
  });

  const getDegree = (nodeId: string) => {
    let degree = 0;
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      if (link.source === nodeId || link.target === nodeId) {
        degree += 1;
      }
    }
    return degree;
  };

  allSkillNodes.forEach((skillNode) => {
    const sourcePoint = initialPositions[skillNode.id];
    if (!sourcePoint) {
      return;
    }

    const candidates = allSkillNodes
      .filter((candidate) => candidate.id !== skillNode.id)
      .sort((a, b) => {
        const pointA = initialPositions[a.id];
        const pointB = initialPositions[b.id];
        if (!pointA || !pointB) {
          return 0;
        }
        return pointDistance(sourcePoint, pointA) - pointDistance(sourcePoint, pointB);
      });

    for (let i = 0; i < candidates.length && getDegree(skillNode.id) < 3; i += 1) {
      const candidate = candidates[i];
      addLink(skillNode.id, candidate.id, candidate.category === skillNode.category ? 'branch' : 'web');
    }
  });

  const adjacency: Record<string, string[]> = {};
  nodes.forEach((node) => {
    adjacency[node.id] = [];
  });
  links.forEach((link) => {
    adjacency[link.source].push(link.target);
    adjacency[link.target].push(link.source);
  });

  const defaultSkillId = allSkillNodes[0]?.id ?? nodes[0]?.id ?? '';

  return {
    nodes,
    links,
    initialPositions,
    adjacency,
    nodeMap,
    defaultSkillId,
  };
};

const getPointerPosition = (event: PointerEvent | ReactPointerEvent, element: HTMLDivElement | null): Point | null => {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return null;
  }

  return {
    x: clamp(((event.clientX - rect.left) / rect.width) * 100, 1, 99),
    y: clamp(((event.clientY - rect.top) / rect.height) * 100, 1, 99),
  };
};

export const Skills = () => {
  const graph = useMemo(() => buildGraph(), []);
  const nodePhaseMap = useMemo(() => {
    const phases: Record<string, number> = {};
    graph.nodes.forEach((node) => {
      phases[node.id] = getNodePhase(node.id);
    });
    return phases;
  }, [graph.nodes]);
  const [positions, setPositions] = useState<Record<string, Point>>(graph.initialPositions);
  const [activeSkillId, setActiveSkillId] = useState(graph.defaultSkillId);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const positionsRef = useRef<Record<string, Point>>(graph.initialPositions);
  const velocitiesRef = useRef<Record<string, Point>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const hasSearch = normalizedSearch.length > 0;

  const matchingCategoryIds = useMemo(() => {
    const matches = new Set<string>();
    if (!hasSearch) {
      return matches;
    }
    graph.nodes.forEach((node) => {
      if (node.kind === 'category' && node.label.toLowerCase().includes(normalizedSearch)) {
        matches.add(node.id);
      }
    });
    return matches;
  }, [graph.nodes, hasSearch, normalizedSearch]);

  const matchingSkillIds = useMemo(() => {
    const matches = new Set<string>();
    if (!hasSearch) {
      return matches;
    }
    const categoryKeys = new Set<CategoryKey>();
    matchingCategoryIds.forEach((categoryId) => {
      const categoryNode = graph.nodeMap[categoryId];
      if (categoryNode?.kind === 'category') {
        categoryKeys.add(categoryNode.category);
      }
    });
    graph.nodes.forEach((node) => {
      if (node.kind !== 'skill') {
        return;
      }
      const labelMatch = node.label.toLowerCase().includes(normalizedSearch);
      const categoryMatch = categoryKeys.has(node.category);
      if (labelMatch || categoryMatch) {
        matches.add(node.id);
      }
    });
    return matches;
  }, [graph.nodeMap, graph.nodes, hasSearch, matchingCategoryIds, normalizedSearch]);

  const searchFocusIds = useMemo(() => {
    const focus = new Set<string>();
    if (!hasSearch) {
      return focus;
    }
    matchingCategoryIds.forEach((nodeId) => focus.add(nodeId));
    matchingSkillIds.forEach((nodeId) => focus.add(nodeId));
    return focus;
  }, [hasSearch, matchingCategoryIds, matchingSkillIds]);

  const searchRelatedIds = useMemo(() => {
    const related = new Set<string>();
    if (!hasSearch) {
      return related;
    }
    searchFocusIds.forEach((nodeId) => {
      related.add(nodeId);
      (graph.adjacency[nodeId] ?? []).forEach((neighborId) => related.add(neighborId));
    });
    return related;
  }, [graph.adjacency, hasSearch, searchFocusIds]);

  const primarySearchSkillId = useMemo(() => {
    if (!hasSearch) {
      return null;
    }
    const exact = graph.nodes.find(
      (node) => node.kind === 'skill' && node.label.toLowerCase() === normalizedSearch,
    );
    if (exact?.kind === 'skill') {
      return exact.id;
    }
    const startsWith = graph.nodes.find(
      (node) => node.kind === 'skill' && node.label.toLowerCase().startsWith(normalizedSearch),
    );
    if (startsWith?.kind === 'skill') {
      return startsWith.id;
    }
    const includes = graph.nodes.find(
      (node) => node.kind === 'skill' && node.label.toLowerCase().includes(normalizedSearch),
    );
    if (includes?.kind === 'skill') {
      return includes.id;
    }

    for (const categoryId of matchingCategoryIds) {
      const categoryNode = graph.nodeMap[categoryId];
      if (categoryNode?.kind !== 'category') {
        continue;
      }
      const firstInCategory = graph.nodes.find(
        (node) => node.kind === 'skill' && node.category === categoryNode.category,
      );
      if (firstInCategory?.kind === 'skill') {
        return firstInCategory.id;
      }
    }

    return null;
  }, [graph.nodeMap, graph.nodes, hasSearch, matchingCategoryIds, normalizedSearch]);

  useEffect(() => {
    if (primarySearchSkillId) {
      setActiveSkillId(primarySearchSkillId);
    }
  }, [primarySearchSkillId]);

  useEffect(() => {
    const rng = makeSeededRandom(9321);
    const initialVelocities: Record<string, Point> = {};
    graph.nodes.forEach((node) => {
      initialVelocities[node.id] = {
        x: (rng() - 0.5) * 0.08,
        y: (rng() - 0.5) * 0.08,
      };
    });
    velocitiesRef.current = initialVelocities;
  }, [graph.nodes]);

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let commitAccumulator = 0;

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      const dtScale = Math.min(dt * 60, 1.1);

      const currentPositions = positionsRef.current;
      const currentVelocities = velocitiesRef.current;
      const forces: Record<string, Point> = {};

      graph.nodes.forEach((node) => {
        forces[node.id] = { x: 0, y: 0 };
      });

      for (let i = 0; i < graph.nodes.length; i += 1) {
        const nodeA = graph.nodes[i];
        for (let j = i + 1; j < graph.nodes.length; j += 1) {
          const nodeB = graph.nodes[j];
          const a = currentPositions[nodeA.id];
          const b = currentPositions[nodeB.id];
          if (!a || !b) {
            continue;
          }

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = Math.max(dx * dx + dy * dy, 8);
          const dist = Math.sqrt(distSq);
          const repulsion = 0.4 / distSq;
          const nx = dx / dist;
          const ny = dy / dist;
          const minGap = getNodeVisualRadius(nodeA) + getNodeVisualRadius(nodeB) + 2.2;
          const overlap = minGap - dist;
          const push = overlap > 0 ? overlap * 0.072 : 0;
          const totalRepulsion = repulsion + push;

          forces[nodeA.id].x -= nx * totalRepulsion;
          forces[nodeA.id].y -= ny * totalRepulsion;
          forces[nodeB.id].x += nx * totalRepulsion;
          forces[nodeB.id].y += ny * totalRepulsion;
        }
      }

      graph.links.forEach((link) => {
        const source = currentPositions[link.source];
        const target = currentPositions[link.target];
        if (!source || !target) {
          return;
        }

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
        const nx = dx / dist;
        const ny = dy / dist;

        const desired = link.strength === 'core' ? 38 : link.strength === 'branch' ? 28 : 47;
        const springK = link.strength === 'core' ? 0.0072 : link.strength === 'branch' ? 0.0082 : 0.0028;
        const stretch = dist - desired;
        const pull = stretch * springK;

        forces[link.source].x += nx * pull;
        forces[link.source].y += ny * pull;
        forces[link.target].x -= nx * pull;
        forces[link.target].y -= ny * pull;
      });

      graph.nodes.forEach((node) => {
        const current = currentPositions[node.id];
        if (!current) {
          return;
        }
        const centerPull = node.kind === 'category' ? 0.00034 : 0.00022;
        const phase = nodePhaseMap[node.id] ?? 0;
        const driftAmp = node.kind === 'category' ? 0.00062 : 0.00042;
        const driftX = Math.sin(time * 0.00028 + phase) * driftAmp;
        const driftY = Math.cos(time * 0.00024 + phase * 0.9) * driftAmp;
        const hubDx = current.x - SEARCH_HUB_CENTER.x;
        const hubDy = current.y - SEARCH_HUB_CENTER.y;
        const hubPadding = getSearchHubPadding(node);
        const hubMaxDx = SEARCH_HUB_HALF_WIDTH + hubPadding;
        const hubMaxDy = SEARCH_HUB_HALF_HEIGHT + hubPadding;
        const hubAbsDx = Math.abs(hubDx);
        const hubAbsDy = Math.abs(hubDy);
        const insideHub = hubAbsDx < hubMaxDx && hubAbsDy < hubMaxDy;
        const gapX = hubMaxDx - hubAbsDx;
        const gapY = hubMaxDy - hubAbsDy;
        forces[node.id].x += (50 - current.x) * centerPull;
        forces[node.id].y += (50 - current.y) * centerPull;
        forces[node.id].x += driftX;
        forces[node.id].y += driftY;
        if (insideHub) {
          if (gapX < gapY) {
            const dirX = hubAbsDx > 0.001 ? Math.sign(hubDx) : Math.sign(Math.cos(phase)) || 1;
            forces[node.id].x += dirX * (0.04 + gapX * 0.09);
          } else {
            const dirY = hubAbsDy > 0.001 ? Math.sign(hubDy) : Math.sign(Math.sin(phase)) || 1;
            forces[node.id].y += dirY * (0.04 + gapY * 0.09);
          }
        }
      });

      const dragState = dragStateRef.current;

      graph.nodes.forEach((node) => {
        const position = currentPositions[node.id];
        const velocity = currentVelocities[node.id];
        const force = forces[node.id];
        if (!position || !velocity || !force) {
          return;
        }

        if (dragState?.nodeId === node.id) {
          position.x = dragState.point.x;
          position.y = dragState.point.y;
          velocity.x = 0;
          velocity.y = 0;
          return;
        }

        velocity.x = (velocity.x + force.x * dtScale) * 0.94;
        velocity.y = (velocity.y + force.y * dtScale) * 0.94;

        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        const maxSpeed = node.kind === 'category' ? 0.2 : 0.16;
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          velocity.x *= scale;
          velocity.y *= scale;
        }

        position.x += velocity.x * dtScale;
        position.y += velocity.y * dtScale;

        const edgePadX =
          node.kind === 'category' ? 8.5 : clamp(3.8 + node.label.length * 0.28, 5, 10.5);
        const edgePadY = node.kind === 'category' ? 3.6 : 2.8;
        const minX = edgePadX;
        const maxX = 100 - edgePadX;
        const minY = 1.5 + edgePadY;
        const maxY = 98.5 - edgePadY;

        if (position.x < minX) {
          position.x = minX;
          velocity.x = Math.abs(velocity.x) * 0.42;
        } else if (position.x > maxX) {
          position.x = maxX;
          velocity.x = -Math.abs(velocity.x) * 0.42;
        }

        if (position.y < minY) {
          position.y = minY;
          velocity.y = Math.abs(velocity.y) * 0.42;
        } else if (position.y > maxY) {
          position.y = maxY;
          velocity.y = -Math.abs(velocity.y) * 0.42;
        }

      });

      for (let i = 0; i < graph.nodes.length; i += 1) {
        const nodeA = graph.nodes[i];
        const a = currentPositions[nodeA.id];
        if (!a) {
          continue;
        }
        for (let j = i + 1; j < graph.nodes.length; j += 1) {
          const nodeB = graph.nodes[j];
          const b = currentPositions[nodeB.id];
          if (!b) {
            continue;
          }

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
          const minGap = getNodeVisualRadius(nodeA) + getNodeVisualRadius(nodeB) + 1.8;
          const overlap = minGap - dist;
          if (overlap <= 0) {
            continue;
          }

          const nx = dx / dist;
          const ny = dy / dist;
          const correction = overlap * 0.5;
          const dragState = dragStateRef.current;
          const aDragged = dragState?.nodeId === nodeA.id;
          const bDragged = dragState?.nodeId === nodeB.id;

          if (!aDragged) {
            a.x -= nx * correction;
            a.y -= ny * correction;
          }
          if (!bDragged) {
            b.x += nx * correction;
            b.y += ny * correction;
          }
        }
      }

      commitAccumulator += dt;
      if (commitAccumulator >= 1 / 45) {
        setPositions({ ...positionsRef.current });
        commitAccumulator = 0;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [graph.links, graph.nodes, nodePhaseMap]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) {
        return;
      }
      const point = getPointerPosition(event, containerRef.current);
      if (!point) {
        return;
      }
      dragStateRef.current = { ...dragState, point };
    };

    const onPointerUp = () => {
      dragStateRef.current = null;
      setDraggingNodeId(null);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handleNodePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, nodeId: string) => {
    event.preventDefault();
    const point = getPointerPosition(event, containerRef.current);
    if (!point) {
      return;
    }

    dragStateRef.current = { nodeId, point };
    setDraggingNodeId(nodeId);

    const node = graph.nodeMap[nodeId];
    if (node?.kind === 'skill') {
      setActiveSkillId(nodeId);
    }
  };

  const activeSkillNode =
    graph.nodeMap[activeSkillId]?.kind === 'skill'
      ? graph.nodeMap[activeSkillId]
      : graph.nodes.find((node) => node.kind === 'skill');

  const activeSkillConnections = new Set<string>();
  if (activeSkillNode) {
    activeSkillConnections.add(activeSkillNode.id);
    (graph.adjacency[activeSkillNode.id] ?? []).forEach((id) => activeSkillConnections.add(id));
  }
  const hasRenderableGraph = graph.nodes.some((node) => Boolean(positions[node.id]));

  return (
    <SectionWrapper id="skills" className="bg-rich-dark">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <motion.h2
              className="text-3xl font-bold text-white md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Technical Arsenal
            </motion.h2>
            <motion.p
              className="mx-auto mt-4 max-w-3xl text-base text-rich-text-muted md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Auto-moving skill network with thin live connections. Drag any node and connected nodes
              react naturally through the link web.
            </motion.p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div
              ref={containerRef}
              className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#03040a]"
              style={{ flex: 1, minWidth: 0, minHeight: 460, height: 640 }}
            >
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,18,40,0.7),rgba(2,3,8,0.97)_74%)]" />

              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 z-10 h-full w-full"
                shapeRendering="geometricPrecision"
                preserveAspectRatio="none"
              >
                {graph.links.map((link) => {
                  const source = positions[link.source];
                  const target = positions[link.target];
                  if (!source || !target) {
                    return null;
                  }

                  const highlighted =
                    activeSkillNode &&
                    (link.source === activeSkillNode.id || link.target === activeSkillNode.id);
                  const closeToActive =
                    activeSkillNode &&
                    activeSkillConnections.has(link.source) &&
                    activeSkillConnections.has(link.target);
                  const searchHighlighted =
                    !hasSearch || searchRelatedIds.has(link.source) || searchRelatedIds.has(link.target);

                  const stroke =
                    link.strength === 'core'
                      ? 'rgba(226,232,240,0.32)'
                      : link.strength === 'branch'
                        ? 'rgba(226,232,240,0.26)'
                        : 'rgba(226,232,240,0.2)';
                  const strokeWidth =
                    link.strength === 'core' ? 0.15 : link.strength === 'branch' ? 0.12 : 0.09;

                  return (
                    <line
                      key={link.id}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      strokeDasharray={link.strength === 'web' ? '0.6 0.8' : undefined}
                      opacity={
                        hasSearch
                          ? highlighted
                            ? 0.95
                            : searchHighlighted
                              ? 0.4
                              : 0.16
                          : highlighted
                            ? 0.95
                            : closeToActive
                              ? 0.62
                              : 0.3
                      }
                    />
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
                <div className="pointer-events-auto w-[min(88%,360px)] rounded-2xl border border-white/10 bg-[#050912]/90 p-4 shadow-[0_20px_50px_rgba(2,8,23,0.65)] backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-rich-text-muted">Search Skill</p>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Type a skill name..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#070d1b] px-3 py-2 text-sm text-rich-text outline-none placeholder:text-rich-text-muted/60 focus:border-accent-primary/60"
                  />
                  {hasSearch && (
                    <p className="mt-2 text-xs text-rich-text-muted">
                      {matchingSkillIds.size} skill{matchingSkillIds.size === 1 ? '' : 's'} found
                    </p>
                  )}
                </div>
              </div>

              {graph.nodes.map((node) => {
                const point = positions[node.id];
                if (!point) {
                  return null;
                }

                const color = categoryMeta[node.category].color;
                const isSkill = node.kind === 'skill';
                const isActive = node.id === activeSkillNode?.id;
                const isDragging = node.id === draggingNodeId;
                const isSearchFocus = searchFocusIds.has(node.id);
                const isSearchRelated = searchRelatedIds.has(node.id);

                return (
                  <button
                    key={node.id}
                    type="button"
                    onPointerDown={(event) => handleNodePointerDown(event, node.id)}
                    onClick={() => {
                      if (isSkill) {
                        setActiveSkillId(node.id);
                      }
                    }}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap focus-visible:outline-none ${
                      isSkill ? 'text-[12px] md:text-[14px]' : 'text-[15px] md:text-[18px]'
                    } ${isSkill ? 'font-medium' : 'font-semibold'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      color,
                      textShadow: isActive
                        ? `0 0 16px ${color}, 0 0 26px rgba(255,255,255,0.08)`
                        : `0 0 8px rgba(0,0,0,0.55)`,
                      opacity: hasSearch
                        ? isSearchFocus
                          ? 1
                          : isSearchRelated
                            ? node.kind === 'category'
                              ? 0.7
                              : 0.45
                            : 0.38
                        : isSkill
                          ? isActive
                            ? 1
                            : 0.9
                          : 0.98,
                      touchAction: 'none',
                    }}
                  >
                    {node.label}
                  </button>
                );
              })}

              {!hasRenderableGraph && (
                <div className="absolute inset-0 z-30 grid place-items-center">
                  <p className="text-sm text-rich-text-muted">Loading skill network...</p>
                </div>
              )}
            </div>

            <motion.aside
              key={activeSkillNode?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full rounded-2xl border border-white/10 bg-[#060914] p-5 lg:w-80 xl:w-96 lg:flex-none"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-rich-text-muted">Selected Skill</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {activeSkillNode?.label ?? 'Select a skill'}
              </p>
              <p className="mt-1 text-sm text-rich-text-muted">
                {activeSkillNode ? categoryMeta[activeSkillNode.category].label : 'Skill'}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-rich-text">
                {activeSkillNode?.description ??
                  'Click any language/skill node in the network to view its description here.'}
              </p>
            </motion.aside>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
