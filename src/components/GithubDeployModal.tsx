import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GitBranch, Github, Check, Copy, ExternalLink, Terminal, Sparkles } from 'lucide-react';

interface GithubDeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GithubDeployModal: React.FC<GithubDeployModalProps> = ({ open, onOpenChange }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const gitCommands = [
    '# 1. 检查并添加全部文件',
    'git add .',
    '',
    '# 2. 提交初始版本',
    'git commit -m "feat: complete Flute Daily practice companion with Shadcn UI"',
    '',
    '# 3. 关联你的 GitHub 仓库 (如 Flute-Daily)',
    'git remote add origin https://github.com/stephenchou888/Flute-Daily.git',
    'git branch -M main',
    '',
    '# 4. 推送到 GitHub (触发自动 Pages 构建部署)',
    'git push -u origin main'
  ].join('\n');

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Github className="h-5 w-5 text-brand-strong dark:text-brand-400" />
          GitHub Pages 编译与发布部署指南
        </DialogTitle>
        <DialogDescription>
          已为您配置好 Vite 相对路径 (`base: './'`) 与自动化 GitHub Actions 流水线
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-2 text-xs">
        {/* Target URL Preview */}
        <div className="p-3.5 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-between">
          <div>
            <span className="text-muted-foreground block text-[11px]">预计发布线上访问网址：</span>
            <span className="font-mono font-bold text-brand-strong dark:text-brand-300 text-sm">
              https://stephenchou888.github.io/Flute-Daily/
            </span>
          </div>
          <Badge variant="brand">GitHub Pages</Badge>
        </div>

        {/* Step 1: Push code */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              步骤 1：本地终端提交并推送至 GitHub 仓库
            </span>
            <button
              onClick={() => copyToClipboard(gitCommands, 1)}
              className="inline-flex items-center gap-1 text-[11px] text-brand-strong hover:text-brand-strong font-medium cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedIndex === 1 ? '已复制命令' : '一键复制代码'}
            </button>
          </div>

          <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed select-all">
            {gitCommands}
          </pre>
        </div>

        {/* Step 2: GitHub Repository Settings */}
        <div className="space-y-2 p-3.5 rounded-xl bg-muted/40 border border-border">
          <span className="font-semibold text-foreground block">
            步骤 2：在 GitHub 仓库中启用 GitHub Pages (仅需首次设置一次)
          </span>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>打开你的 GitHub 仓库页面：<span className="font-mono text-foreground font-medium">github.com/stephenchou888/Flute-Daily</span></li>
            <li>点击顶部标签页 <strong className="text-foreground">Settings</strong>（设置）</li>
            <li>在左侧菜单栏找到并点击 <strong className="text-foreground">Pages</strong></li>
            <li>在 <strong className="text-foreground">Build and deployment &gt; Source</strong> 下拉菜单中，选择：<strong className="text-brand-strong dark:text-brand-400">GitHub Actions</strong></li>
            <li>以后每次你执行 <code className="bg-muted px-1 rounded">git push</code>，系统就会自动编译 Vite 并更新发布！</li>
          </ol>
        </div>

        {/* Step 3: Workflow pre-installed */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">预设自动化配置已就绪：</strong>
            代码库内已生成 <code className="text-foreground font-mono">.github/workflows/deploy.yml</code> 配置文件，无需手动编写脚本，推送后 1-2 分钟即可完成全自动编译！
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          关闭
        </Button>
        <Button
          onClick={() => {
            window.open('https://github.com/stephenchou888', '_blank');
          }}
          className="flex items-center gap-1.5"
        >
          前往 GitHub <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
