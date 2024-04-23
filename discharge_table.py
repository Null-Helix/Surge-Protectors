import pandas as pd
import sys
import matplotlib.pyplot as plt
import seaborn as sns

# Read CSV into DataFrame
df = pd.read_csv("../BatteryTableAllLogs.csv", parse_dates=["timestamp"])

# Sort DataFrame and create jump clusters
clustered_df = (df.sort_values(by=["hostName", "device", "timestamp"])
                .groupby(["hostName", "device"])
                .apply(lambda x: x.assign(jump_cluster=(x["capacity"] - x["capacity"].shift(fill_value=x["capacity"].iloc[0]) > 5).cumsum()))
                .reset_index(drop=True))

# Parse arguments
if '-s' in sys.argv:
    compute_spo2_cluster = True
    sys.argv.remove('-s')
else:
    compute_spo2_cluster = False

if '-r' in sys.argv:
    compute_resp_cluster = True
    sys.argv.remove('-r')
else:
    compute_resp_cluster = False

if '-c' in sys.argv:
    create_combined_plot = True
    sys.argv.remove('-c')
else:
    create_combined_plot = False

host = sys.argv[1:]  # Get the list of hosts

# Calculate spo2 cluster lengths if required
if compute_spo2_cluster:
    spo2_cluster_lengths = (clustered_df[(clustered_df["hostName"].isin(host)) & (clustered_df["device"] == "SPO2SENSOR")]
                            .groupby(["hostName", "jump_cluster"])
                            .agg(mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
                                 hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600))
                            .reset_index())

    # Find max, min, and average usage
    max_usage = spo2_cluster_lengths[spo2_cluster_lengths["hours"] == spo2_cluster_lengths["hours"].max()]
    min_usage = spo2_cluster_lengths[spo2_cluster_lengths["hours"] == spo2_cluster_lengths["hours"].min()]
    average_usage = spo2_cluster_lengths["hours"].mean()

    print("Max Usage for SPO2SENSOR:")
    print(max_usage)
    print("\nMin Usage for SPO2SENSOR:")
    print(min_usage)
    print("\nAverage Usage for SPO2SENSOR:", average_usage)

    # Plot histogram for SPO2SENSOR
    plt.hist(spo2_cluster_lengths["hours"], bins=10)
    plt.xlabel("Hours")
    plt.ylabel("Frequency")
    plt.title("Distribution of Hours Used for SPO2SENSOR Batteries")
    plt.savefig("spo2_histogram.png")  # Save histogram as PNG

    # Boxplot for SPO2SENSOR
    plt.boxplot(spo2_cluster_lengths["hours"])
    plt.title("Distribution of Hours Used for SPO2SENSOR Batteries")
    plt.ylabel("Hours")
    plt.savefig("spo2_boxplot.png")

# Calculate resp cluster lengths if required
if compute_resp_cluster:
    resp_cluster_lengths = (clustered_df[(clustered_df["hostName"].isin(host)) & (clustered_df["device"] == "RESPSENSOR")]
                            .groupby(["hostName", "jump_cluster"])
                            .agg(mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
                                 hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600))
                            .reset_index())

    # Find max, min, and average usage
    max_usage_resp = resp_cluster_lengths[resp_cluster_lengths["hours"] == resp_cluster_lengths["hours"].max()]
    min_usage_resp = resp_cluster_lengths[resp_cluster_lengths["hours"] == resp_cluster_lengths["hours"].min()]
    average_usage_resp = resp_cluster_lengths["hours"].mean()

    print("Max Usage for RESPSENSOR:")
    print(max_usage_resp)
    print("\nMin Usage for RESPSENSOR:")
    print(min_usage_resp)
    print("\nAverage Usage for RESPSENSOR:", average_usage_resp)

    # Plot histogram for RESPSENSOR
    plt.hist(resp_cluster_lengths["hours"], bins=10)
    plt.xlabel("Hours")
    plt.ylabel("Frequency")
    plt.title("Distribution of Hours Used for RESPSENSOR Batteries")
    plt.savefig("resp_histogram.png")

    # Boxplot for RESPSENSOR
    plt.boxplot(resp_cluster_lengths["hours"])
    plt.title("Distribution of Hours Used for RESPSENSOR Batteries")
    plt.ylabel("Hours")
    plt.savefig("resp_boxplot.png")

# Create combined plot if required
if create_combined_plot:

    spo2_cluster_lengths = (
        clustered_df[(clustered_df["hostName"].isin(host)) & (clustered_df["device"] == "SPO2SENSOR")]
        .groupby(["hostName", "jump_cluster"])
        .agg(mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
             hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600))
        .reset_index())

    resp_cluster_lengths = (
        clustered_df[(clustered_df["hostName"].isin(host)) & (clustered_df["device"] == "RESPSENSOR")]
        .groupby(["hostName", "jump_cluster"])
        .agg(mins=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 60),
             hours=("timestamp", lambda x: (x.max() - x.min()).total_seconds() / 3600))
        .reset_index())

    spo2_data = pd.DataFrame({"lengths": spo2_cluster_lengths["hours"], "sensor": "SPO2SENSOR"})
    resp_data = pd.DataFrame({"lengths": resp_cluster_lengths["hours"], "sensor": "RESPSENSOR"})

    combined_data = pd.concat([spo2_data, resp_data])

    # Create boxplot using seaborn
    sns.boxplot(x="sensor", y="lengths", data=combined_data)
    plt.title("Sensor Battery Usage in Hours")
    plt.xlabel("Sensor")
    plt.ylabel("Hours")
    plt.savefig("comparison_boxplot.png")
