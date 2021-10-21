class Bubble extends eui.Component {
	public constructor() {
		super();
		this.skinName = "bubble";
	}

	private _bRay = new df.BubbleRay();
	private _ray = new egret.Shape();
	protected childrenCreated() {
		this._bRay.rect.x = this._bRay.rect.y = 0;
		this._bRay.rect.width = this.stage.stageWidth;
		this._bRay.rect.height = this.stage.stageHeight;

		this._bRay.start.x = this._bRay.rect.width / 2 + 100;
		this._bRay.start.y = this._bRay.rect.height - 100;

		this._bRay.limit = this._bRay.rect.y - 100;

		this.addChild(this._ray);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
	}

	private onMove(e: egret.TouchEvent) {
		let angle = df.MathUtil.radian2angle(Math.atan2(e.stageY - this._bRay.start.y, e.stageX - this._bRay.start.x));

		this._bRay.calPoints(angle, 0);
		this.drawRay();
	}

	private drawRay() {
		this._ray.graphics.clear();
		this._ray.graphics.lineStyle(2, 0x00ff00);
		for (let i = 0; i < this._bRay.rayPoints.length; i++) {
			let tp = this._bRay.rayPoints[i];
			if (i == 0) {
				this._ray.graphics.moveTo(tp.x, tp.y);
			}
			else {
				this._ray.graphics.lineTo(tp.x, tp.y);
			}
		}
	}
}