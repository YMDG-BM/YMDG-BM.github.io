---
title: 第一章——环境配置
index: true
icon: mdi:chip
order: 1
dir:
  link: true
  order: 1
category:
  - 嵌入式开发
  - 环境配置
---
工欲善其事，必先利其器。在进行我们的嵌入式开发之旅之前，我们要先配置好环境。好在，rust的环境配置十分省心。

::: important
注意：这部分内容仅仅基于作者本人操作系统环境—— Arch Linux撰写。对自己环境的适配，请根据自己实际情况酌情修改我们提供的代码和命令。stlink等的驱动不在这个部分的讨论范围内。
:::

我们只需要用pacman安装rustup即可。

```bash
sudo pacman -S rustup
rustup install stable
rustup target add thumbv7em-none-eabihf
```
安装完成后，需要安装probe-rs，便于我们进行固件烧录。

```bash
cargo install probe-rs
```

至此，我们的基本环境就安装完毕了。接下来，我们用cargo 新建一个项目文件夹，开始我们的embedded rust之旅。

```bash
cargo new stm32-ipod-rs
cd stm32-ipod-rs
```

为了让编译器知道我们的目标平台是我们的stm32，我们需要手动创建一个配置文件。

```bash
mkdir .cargo
touch .cargo/config.toml
```
写入这些内容：

```toml
[build]
target = "thumbv7em-none-eabihf"

[target.thumbv7em-none-eabihf]
rustflags = ["-C", "link-arg=-Tlink.x", "-C", "link-arg=-Tdefmt.x"]
runner = "probe-rs run --chip STM32F407ZG"
```
即可。现在，我们执行cargo run，就会把我们的项目编译，并自动顺着stlink烧录到单片机上。

为了为单片机写程序，我们需要这些库。这是截至本文撰写完毕时这个项目用到的库，请酌情采用。
```toml
cortex-m = { version = "0.7.7", features = ["critical-section-single-core"] }
cortex-m-rt = "0.7.5"
defmt = "1.0.1"
defmt-rtt = "1.1.0"
embassy-executor = { version = "0.10.0", features = ["defmt", "executor-interrupt", "executor-thread", "platform-cortex-m"] }
embassy-futures = "0.1.2"
embassy-stm32 = { version = "0.6.0", features = ["defmt", "exti", "memory-x", "stm32f407zg", "time-driver-tim4"] }
embassy-time = { version = "0.5.1", features = ["defmt-timestamp-uptime", "tick-hz-8_000_000"] }
embedded-hal = "1.0.0"
embedded-io = "0.7.1"
heapless = "0.9.2"
nb = "1.1.0"
panic-probe = { version = "1.0.0", features = ["print-defmt"] }
```

我们不需要像原来使用stm32-hal的rust实现那样自己手写memory.x。embassy已经提供了memory-x feature，我们在添加这个库时自己手动启用这个feature即可。

之后，我们需要进入main.rs文件，删掉所有内容。我们先写一个闪灯程序。看原理图，LED连接在PC13引脚上，另一端连接3V3，说明如果要让这个LED灯亮起来，我们需要拉低PC13的电平。

首先声明无标准库，且无main函数。

```rust
#![no_std]
#![no_main]
```

然后引入embassy-stm32的gpio模块以及embassy-executor的Spawner类，并引入embassy-time的Timer来实现非阻塞的延时。
```rust
use embassy_executor::Spawner;
use embassy_stm32::{Output, Level, Speed};
use embassy_time::Timer;
```
因为声明了无标准库，所以panic需要我们自己处理。我们可以通过引入defmt_rtt和panic_probe自动帮我们进行处理。
```rust
use {defmt_rtt as _, panic_probe as _};
```

之后，我们需要借助embassy-executor的Spawner来执行我们自己的main函数。由于embassy是异步库，所以我们的main函数也必须是异步的。

```rust
#[embassy_executor::main]
async fn main(_spawner: Spawner) {
}
```

初始化stm32，并定义我们LED连接的引脚。
```rust
let p = embassy_stm32::init(Default::default());
let mut led = Output::new(p.PC13, Level::High, Speed::Low);
```
之后，我们需要一个loop来执行我们的主要逻辑部分。我们的逻辑只有把led引脚的电平置低。

```rust
loop {
    led.set_low();
    Timer::after_millis(500).await;
    led.set_high();
    Timer::after_millis(500).await;
}
```
至此，我们的程序就可以完成闪灯操作了。

完整代码：
```rust
#![no_std]
#![no_main]

use embassy_executor::Spawner;
use embassy_stm32::{Output, Level, Speed};
use embassy_time::Timer;

use {defmt_rtt as _, panic_probe as _};

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let p = embassy_stm32::init(Default::default());
    let mut led = Output::new(p.PC13, Level::High, Speed::Low);

    loop {
        led.set_low();
        Timer::after_millis(500).await;
        led.set_high();
        Timer::after_millis(500).await;
    }
}

```

