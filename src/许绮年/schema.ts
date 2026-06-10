export const Schema = z.object({
  世界: z.object({
    调查阶段: z.enum(['拒绝委托', '整理手稿', '证词拼合', '公开前夜', '夺回叙述']).prefault('拒绝委托'),
    当前地点: z.string().prefault('澄灯书局档案室'),
    公开风险: z.coerce.number().prefault(20).transform(value => _.clamp(value, 0, 100)),
    线索状态: z.object({
      删稿手稿: z.enum(['未发现', '可发现', '已发现', '已核对', '已公开']).prefault('已发现'),
      旧录音: z.enum(['未发现', '可发现', '已发现', '已核对', '已公开']).prefault('未发现'),
      读者来信: z.enum(['未发现', '可发现', '已发现', '已核对', '已公开']).prefault('可发现'),
      门生名单: z.enum(['未发现', '可发现', '已发现', '已核对', '已公开']).prefault('未发现'),
      出版社合同: z.enum(['未发现', '可发现', '已发现', '已核对', '已公开']).prefault('未发现')
    }).prefault({})
  }).prefault({}),
  许绮年: z.object({
    信任度: z.coerce.number().prefault(10).transform(value => _.clamp(value, 0, 100)),
    压力值: z.coerce.number().prefault(35).transform(value => _.clamp(value, 0, 100)),
    叙述稳定度: z.coerce.number().prefault(45).transform(value => _.clamp(value, 0, 100)),
    关系阶段: z.enum(['证人距离', '谨慎同盟', '共同执笔', '恋人未确认', '恋人']).prefault('证人距离'),
    亲密许可: z.enum(['拒绝触碰', '允许陪伴', '允许拥抱', '允许亲吻']).prefault('拒绝触碰')
  }).prefault({}),
  主角: z.object({
    调查身份: z.string().prefault('受托调查者'),
    当前任务: z.string().prefault('核对删稿手稿的页码、来源和删改痕迹')
  }).prefault({})
});

export type Schema = z.output<typeof Schema>;
