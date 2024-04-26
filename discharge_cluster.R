library(ggplot2)
library(dplyr)
library(tidyr)
library(readr)
library(dbscan)

# Parse command-line arguments
args <- commandArgs(trailingOnly = TRUE)

# Default values
epsilon <- 5
minPts <- 1
hostName <- NULL
device <- NULL
cluster_vec <- NULL
c_flag = FALSE
type <- NULL

# Parse arguments
for (i in 1:(length(args) - 1)) {
  if (args[i] == "-eps") {
    epsilon <- as.numeric(args[i + 1])
  } else if (args[i] == "-pts") {
    minPts <- as.integer(args[i + 1])
  } else if (args[i] == "-h") {
    hostName <- args[i + 1]
  } else if (args[i] == "-d") {
    device <- args[i + 1]
  } else if (args[i] == "-c") {
    c_flag = TRUE
    start <- as.integer(args[i + 1])
    end <- as.integer(args[i + 2])
    cluster_vec <- c(start:end)
  } else if (args[i] == "-type") {
    type <- args[i + 1]
  }
}

# Load data
df <- read_csv("BatteryTableAllLogs.csv")
df$timestamp <- as.POSIXct(df$timestamp)
reference_time <- as.POSIXct("2021-01-01 00:00:00")
df$second <- as.numeric(difftime(df$timestamp, reference_time, units = "secs"))
df$minute <- as.numeric(difftime(df$timestamp, reference_time, units = "mins"))

# Filter and preprocess data
host_df <- df
if (!is.null(hostName)) {
  host_df <- host_df %>% filter(hostName == !!hostName)
}
if (!is.null(device)) {
  host_df <- host_df %>% filter(device == !!device)
}
if (!is.null(type)) {
  if (type == "normal") {
    host_df <- host_df %>%
      mutate(norm_cap = (capacity - mean(capacity)/sd(capacity)))
  } else if (type == "divide") {
    host_df <- host_df %>%
      mutate(norm_cap = capacity/100) 
  } else if (type == "none") {
    host_df <- host_df %>%
      mutate(norm_cap = capacity) 
  }
}

data <- host_df %>%
  select(minute, norm_cap)

# Perform DBSCAN clustering
dbscan_result <- dbscan(data, eps = epsilon, minPts = minPts)
cluster_labels <- dbscan_result$cluster
host_df$cluster <- cluster_labels

# Create plots
plot1 <- ggplot(host_df, aes(x = timestamp, y = capacity, color = factor(cluster))) +
  geom_point() +
  labs(x = "Timestamp", y = "Capacity", color = "Cluster") +
  ggtitle("Capacity vs. Timestamp with Clustering") +
  theme_minimal()

if (c_flag) {
  filtered_df <- host_df %>% filter(cluster %in% cluster_vec)
  print(filtered_df)
  
  plot2 <- ggplot(filtered_df, aes(x = timestamp, y = capacity, color = factor(cluster))) +
    geom_point() +
    labs(x = "Timestamp", y = "Capacity", color = "Cluster") +
    ggtitle("Capacity vs. Timestamp with Clustering") +
    theme_minimal()
  
  # Create directory if it doesn't exist
  if (!file.exists("discharge_cycle_plots")) {
    dir.create("discharge_cycle_plots")
  }
  
  # Save plots as PNG files
  png(file = "discharge_cycle_plots/closer_plot.png", width = 800, height = 600)
  print(plot2)
  dev.off()
}

# Save plot1
png(file = "discharge_cycle_plots/plot1.png", width = 800, height = 600)
plot1
dev.off()
