import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { HelpCircle, Check, AlertTriangle, Wind, Sparkles, ShieldCheck } from 'lucide-react';

export const MasterTips: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Wind className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          长笛大师演奏秘诀与杂音排查
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          巴黎音乐学院学派口风法则、气息支撑原理及常见演奏问题极速解决方案
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Embouchure golden rules */}
        <Card className="border-border bg-card shadow-sm p-6">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-3">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-base text-foreground">口风 (Embouchure) 黄金法则</h3>
          </div>
          <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">吹孔覆盖比例：</strong>
                下唇恰好覆盖笛头吹孔的 1/4 至 1/3。覆盖过少则声音发虚杂气重，覆盖过多则音色发暗且音准偏低。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">风口形状 (Aperture)：</strong>
                唇中央成微扁的椭圆形（如同吹凉热茶时的形状），嘴角肌肉轻柔向下向外固定，严禁过度拉长成“咧嘴笑”状。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">高低八度转换密码：</strong>
                低音区口风孔略大，气流向下（吹向胸腔方向）；高音区不靠死命用力吹，而是向前推进下唇与下颚，微缩风口提升气速。
              </span>
            </li>
          </ul>
        </Card>

        {/* 2. Breathing & Diaphragm Support */}
        <Card className="border-border bg-card shadow-sm p-6">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-3">
            <Wind className="h-5 w-5" />
            <h3 className="text-base text-foreground">腹式呼吸与气息支撑 (Support)</h3>
          </div>
          <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">吸气无声与横膈膜：</strong>
                吸气时肩膀与胸腔上部保持完全沉稳放松，气体深入腹腔四周（感受腰侧与下腹部膨胀），如同闻花香般深长自然。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">喉部打开 (Open Throat)：</strong>
                喉咙保持打哈欠初期的舒展状态，想象在用温暖的气息呵暖玻璃窗，音色才能宽广浑厚。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="p-0.5 rounded-full bg-teal-500/20 text-teal-600 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-foreground">长音结尾淡出：</strong>
                不要用舌头去“切断”长音。依靠下腹肌保持气压，唇缝慢慢微收，让余音在房间共鸣中自然飘散。
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Troubleshooting Matrix */}
      <Card className="border-border bg-card shadow-sm p-6">
        <h3 className="font-semibold text-foreground text-base flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          常见音色与音准问题速查解决手册
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="p-3 rounded-l-lg">问题现象</th>
                <th className="p-3">可能原因</th>
                <th className="p-3 rounded-r-lg">大师解决方案</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-semibold text-foreground">吹奏时漏气杂音大 (Airy / Fuzzy)</td>
                <td className="p-3 text-muted-foreground">吹孔对得不准；嘴唇风口过大；气流打在对侧外边过多</td>
                <td className="p-3 text-teal-600 dark:text-teal-400 font-medium">
                  在镜子前检查吹孔是否正对下唇红线中心；将嘴角略收拢，缩窄气流核心束。
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">中高音 E6 破音或难发音</td>
                <td className="p-3 text-muted-foreground">长笛无 E 分割机制；左手 3 指未放开；气流角度不准</td>
                <td className="p-3 text-teal-600 dark:text-teal-400 font-medium">
                  严防左手无名指下按；将下颚略往前送，气流角度向上提升，用快速集中气流击中外边缘。
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">强音 (ff) 偏高，弱音 (pp) 偏低</td>
                <td className="p-3 text-muted-foreground">气速改变导致音高漂移，缺少下唇动态补偿</td>
                <td className="p-3 text-teal-600 dark:text-teal-400 font-medium">
                  吹 ff 强音时，下巴微收，气流稍向下吹；吹 pp 弱音时，下唇往前送，气流向上吹以托住音高。
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">低音 C4 / D4 吹不出，容易冒高音</td>
                <td className="p-3 text-muted-foreground">嘴唇过于紧张紧绷；按键皮垫未盖严；气流过猛</td>
                <td className="p-3 text-teal-600 dark:text-teal-400 font-medium">
                  彻底放松唇部与下颌，口风如同说“哦(Oh)”，气流缓慢而深厚，检查右小指与按键是否按实。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Care & Maintenance */}
      <Card className="border-border bg-card shadow-sm p-6">
        <div className="flex items-center gap-2 text-foreground font-semibold mb-3">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <span>每日练后长笛保养备忘录</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
            <strong className="text-foreground block mb-1">1. 通条布擦拭管壁</strong>
            每次练习完毕，务必用木质/塑料通条裹纯棉通条布擦拭管身内壁水汽，防止内部积水发霉。
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
            <strong className="text-foreground block mb-1">2. 皮垫吸水纸清洁</strong>
            若 G# 键或闭孔键有粘滞嗒嗒声，使用专用吸水纸夹在皮垫下轻按 2-3 次，切勿在闭合状态下拉扯纸张！
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
            <strong className="text-foreground block mb-1">3. 严禁自行涂机油</strong>
            长笛精密联动机械间隙仅微米级，普通润滑油容易粘附灰尘导致连杆卡死，请交由专业技师调校。
          </div>
        </div>
      </Card>
    </div>
  );
};
