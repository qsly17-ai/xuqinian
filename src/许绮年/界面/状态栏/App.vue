<template>
  <section class="qinian-shell" aria-label="许绮年状态栏">
    <header class="qinian-header">
      <div>
        <p class="qinian-kicker">澄灯档案 / {{ world.调查阶段 }}</p>
        <h1>许绮年手稿调查</h1>
        <p class="qinian-location">{{ world.当前地点 }}</p>
      </div>
      <div class="qinian-risk" :data-tone="riskTone">
        <span>公开风险</span>
        <strong>{{ world.公开风险 }}</strong>
      </div>
    </header>

    <div class="qinian-progress" aria-label="调查阶段进度">
      <span v-for="phase in phases" :key="phase" :class="{ active: phase === world.调查阶段 }">
        {{ phase }}
      </span>
    </div>

    <main class="qinian-grid">
      <section class="qinian-panel qinian-panel--lead">
        <div class="qinian-panel-title">
          <span>证词对象</span>
          <strong>{{ qinian.关系阶段 }}</strong>
        </div>
        <div class="qinian-permission">亲密许可：{{ qinian.亲密许可 }}</div>
        <div class="qinian-meters">
          <div v-for="metric in metrics" :key="metric.label" class="qinian-meter">
            <div class="qinian-meter-label">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}</strong>
            </div>
            <div class="qinian-meter-track">
              <i :style="{ width: meterWidth(metric.value) }" :data-tone="metric.tone"></i>
            </div>
          </div>
        </div>
      </section>

      <section class="qinian-panel">
        <div class="qinian-panel-title">
          <span>线索核对</span>
          <strong>{{ resolvedClues }}/{{ clues.length }}</strong>
        </div>
        <ul class="qinian-clues">
          <li v-for="clue in clues" :key="clue.name" :data-status="clue.status">
            <span>{{ clue.name }}</span>
            <strong>{{ clue.status }}</strong>
          </li>
        </ul>
      </section>

      <section class="qinian-panel qinian-panel--task">
        <div class="qinian-panel-title">
          <span>主角身份</span>
          <strong>{{ protagonist.调查身份 }}</strong>
        </div>
        <p>{{ protagonist.当前任务 }}</p>
      </section>
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';

const phases = ['拒绝委托', '整理手稿', '证词拼合', '公开前夜', '夺回叙述'];
const store = useDataStore();

const data = computed(() => store.data);
const world = computed(() => data.value.世界);
const qinian = computed(() => data.value.许绮年);
const protagonist = computed(() => data.value.主角);

const clues = computed(() =>
  Object.entries(world.value.线索状态).map(([name, status]) => ({
    name,
    status: String(status),
  })),
);

const resolvedClues = computed(
  () => clues.value.filter(clue => clue.status === '已核对' || clue.status === '已公开').length,
);

const metrics = computed(() => [
  { label: '信任度', value: qinian.value.信任度, tone: 'trust' },
  { label: '压力值', value: qinian.value.压力值, tone: 'stress' },
  { label: '叙述稳定度', value: qinian.value.叙述稳定度, tone: 'stability' },
]);

const riskTone = computed(() => {
  if (world.value.公开风险 >= 70) return 'danger';
  if (world.value.公开风险 >= 40) return 'watch';
  return 'calm';
});

function meterWidth(value: number) {
  return `${Math.max(0, Math.min(100, value))}%`;
}
</script>
