import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

export enum AgentTier {
  SALES_AGENT = 'SALES_AGENT',       // 1단계 (최상위)
  SUB_SALES_AGENT = 'SUB_SALES_AGENT', // 2단계
  SALES_REP = 'SALES_REP',           // 3단계 (최하위)
}

@Entity('agents')
@Tree('materialized-path') // 계층 구조 조회를 위한 트리 설정
export class Agent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AgentTier })
  tier: AgentTier;

  // 상위 에이전트 연결
  @TreeParent()
  parent: Agent;

  // 하위 에이전트 목록
  @TreeChildren()
  children: Agent[];

  // 해당 에이전트가 가져가는 마진율 (예: 0.5%)
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.5 })
  margin_rate: number;

  @CreateDateColumn()
  created_at: Date;
}